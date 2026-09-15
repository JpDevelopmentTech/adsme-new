/**
 * Exporta las campañas de Google Ads a adsme.
 *
 * Este archivo NO forma parte del build de Next: se pega tal cual dentro de
 * Google Ads, en Herramientas y configuración → Acciones masivas → Scripts.
 * Al correr ahí ya está autenticado por la propia sesión de Google, así que no
 * necesita developer token, OAuth ni refresh token.
 *
 * Envía dos cosas por cada cuenta, igual que las integraciones de Meta y TikTok:
 * el acumulado de toda la vida de cada campaña y su serie día a día desde que
 * existe. La primera alimenta las tarjetas del reporte; la segunda, las gráficas
 * de evolución.
 *
 * Si se crea en una cuenta MCC recorre todas sus subcuentas; si se crea dentro
 * de una cuenta suelta, exporta solo esa.
 *
 * Antes de programarlo hay que rellenar las dos constantes de abajo.
 */

/** URL pública de adsme, sin barra final. Google no puede alcanzar localhost. */
const ADSME_URL = 'https://TU-DOMINIO.vercel.app';

/** Mismo valor que GOOGLE_ADS_INGEST_SECRET en el servidor. */
const ADSME_SECRET = 'PEGA_AQUI_EL_SECRETO';

/**
 * Primer año del que se pide la serie diaria. Conviene que sea anterior a la
 * campaña más antigua de la cuenta: un año de más es una consulta vacía y
 * barata, uno de menos deja un hueco permanente en los reportes.
 */
const ANIO_INICIAL = 2020;

/**
 * Días recientes para los que se rescatan las reproducciones diarias cuando la
 * cuenta no admite `metrics.video_views` en las consultas (ver
 * `leerCampanasDeVideo`). Por esa vía cada día cuesta una consulta aparte, así
 * que el histórico entero no cabría en el tiempo que Google da a un script; el
 * acumulado de cada campaña sí lleva siempre sus reproducciones, porque se pide
 * de una sola vez.
 */
const DIAS_VISTAS_DIARIAS = 90;

/** Filas por petición. Trocear evita cuerpos enormes y timeouts. */
const TAMANO_LOTE = 2000;

const RUTA_INGESTA = '/api/google-ads/ingest';

/**
 * Campos que la cuenta ha rechazado durante esta ejecución. Sirve para saber si
 * hay que ir a buscar las reproducciones por el otro camino.
 */
const CAMPOS_OMITIDOS = {};

function main() {
  if (typeof AdsManagerApp === 'undefined') {
    exportarCuentaActual();
    return;
  }

  for (const cuenta of AdsManagerApp.accounts().get()) {
    AdsManagerApp.select(cuenta);
    exportarCuentaActual();
  }
}

/**
 * Exporta el acumulado y el histórico completo de la cuenta en la que está el
 * script. La serie diaria se manda año a año y en cuanto se lee: acumularla
 * entera en memoria antes de enviar nada es lo que agota un script largo.
 */
function exportarCuentaActual() {
  const customerId = AdsApp.currentAccount().getCustomerId().replace(/-/g, '');
  const entidades = leerCampanasDeVideo();
  const campanas = leerCampanas(entidades);

  // Las campañas van primero y solas: la serie diaria de adsme cuelga de ellas.
  enviar({customerId: customerId, campaigns: campanas, daily: []});
  console.log(`${customerId}: ${campanas.length} campañas.`);

  const rescate = vistasDeRescate();
  let total = 0;

  for (const anio of anios()) {
    const dias = leerSerieDiaria(anio, rescate);

    enviarSerie(customerId, dias);
    total += dias.length;

    if (dias.length > 0) console.log(`${customerId}: ${anio} → ${dias.length} días.`);
  }

  console.log(`${customerId}: ${total} días de histórico enviados.`);
}

/** Campos que toda versión de la API reconoce. */
const CAMPOS_BASE = [
  'campaign.id',
  'campaign.name',
  'campaign.status',
  'metrics.cost_micros',
  'metrics.impressions',
  'metrics.clicks',
];

/**
 * Campos que enriquecen el reporte pero que algunas versiones de la API no
 * exponen a Scripts. Si Google los rechaza, la consulta se repite sin ellos: es
 * preferible perder uno a no exportar nada. Las reproducciones y las fechas
 * tienen plan B en el selector de campañas, porque sin ellas el reporte se queda
 * sin su métrica principal en YouTube y sin saber cuándo corrió cada campaña.
 */
const CAMPOS_OPCIONALES = [
  'campaign.advertising_channel_type',
  'campaign.start_date',
  'campaign.end_date',
  'metrics.video_views',
  'metrics.engagements',
];

/**
 * Acumulado de cada campaña. Sin filtro de fecha, Google devuelve las métricas
 * de toda la vida de la campaña, que es lo que adsme guarda en `campaigns`.
 */
function leerCampanas(entidades) {
  const filas = buscarTolerante(CAMPOS_BASE, CAMPOS_OPCIONALES,
      "FROM campaign WHERE campaign.status != 'REMOVED'");

  return filas.map(function(fila) {
    const id = String(fila.campaign.id);
    const entidad = entidades[id];
    const datos = metricas(fila.metrics);

    if (!datos.videoPlays) datos.videoPlays = vistas(entidad, ['ALL_TIME']);

    return Object.assign(datos, {
      externalCampaignId: id,
      name: fila.campaign.name,
      status: fila.campaign.status,
      objective: fila.campaign.advertisingChannelType || null,
      startsAt: fila.campaign.startDate || fecha(entidad, 'getStartDate'),
      endsAt: fila.campaign.endDate || fecha(entidad, 'getEndDate'),
    });
  });
}

/**
 * Un registro por campaña y día del año pedido. El histórico se recorre año a
 * año porque un único tramo de varios años devuelve decenas de miles de filas
 * de golpe, y el script tiene que sostenerlas todas en memoria mientras las
 * recorre.
 */
function leerSerieDiaria(anio, rescate) {
  const base = ['campaign.id', 'segments.date', 'metrics.cost_micros',
                'metrics.impressions', 'metrics.clicks'];
  const opcionales = ['metrics.video_views', 'metrics.engagements'];

  const filas = buscarTolerante(base, opcionales,
      `FROM campaign WHERE segments.date BETWEEN '${anio}-01-01' AND '${anio}-12-31'`);

  return filas.map(function(fila) {
    const id = String(fila.campaign.id);
    const datos = metricas(fila.metrics);

    if (!datos.videoPlays && rescate) {
      const clave = `${id}|${fila.segments.date.replace(/-/g, '')}`;

      datos.videoPlays = rescate[clave] || 0;
    }

    return Object.assign(datos, {
      externalCampaignId: id,
      date: fila.segments.date,
    });
  });
}

/** Años que se piden, del primero configurado al actual. */
function anios() {
  const actual = Number(hoy('yyyy'));
  const lista = [];

  for (let anio = ANIO_INICIAL; anio <= actual; anio++) lista.push(anio);

  return lista;
}

/**
 * Campañas de vídeo indexadas por id, con sus estadísticas de toda la vida ya
 * cargadas: `forDateRange` las trae junto a las entidades, así que pedirlas
 * después con ese mismo rango no cuesta otra consulta.
 *
 * Existe porque `metrics.video_views`, `campaign.start_date` y
 * `campaign.end_date` no siempre se pueden pedir en `AdsApp.search()`: hay
 * cuentas que los rechazan con `UNRECOGNIZED_FIELD` aunque la documentación los
 * liste, y entonces las reproducciones llegaban a cero. El selector es otro
 * camino y sí expone ambas cosas.
 */
function leerCampanasDeVideo() {
  const porId = {};

  // Sin rango en el selector las estadísticas se piden una por una, que es
  // lento pero funciona: se intenta con rango y solo se renuncia si falla.
  if (!indexar(porId, () => AdsApp.videoCampaigns().forDateRange('ALL_TIME').get())) {
    indexar(porId, () => AdsApp.videoCampaigns().get());
  }

  return porId;
}

/**
 * Vuelca un iterador de campañas en el mapa. Devuelve si pudo recorrerlo entero:
 * el error de un selector no soportado salta al iterar, no al construirlo.
 */
function indexar(porId, obtener) {
  try {
    for (const campana of obtener()) {
      porId[String(campana.getId())] = campana;
    }

    return true;
  } catch (error) {
    console.log(`No se pudieron listar las campañas de vídeo: ${error}`);

    return false;
  }
}

/**
 * Reproducciones de una campaña con los argumentos que acepta `getStatsFor`:
 * `['ALL_TIME']` o dos fechas `YYYYMMDD`.
 *
 * Devuelve 0 en vez de lanzar: una campaña que no sea de vídeo no está en el
 * mapa, y un fallo de estadísticas no debe tumbar la exportación entera.
 */
function vistas(campana, argumentos) {
  if (!campana) return 0;

  try {
    const stats = campana.getStatsFor.apply(campana, argumentos);

    return Math.round(Number(stats.getViews() || 0));
  } catch (error) {
    console.log(`Sin reproducciones para ${campana.getId()}: ${error}`);

    return 0;
  }
}

/**
 * Reproducciones por campaña y día de los últimos `DIAS_VISTAS_DIARIAS` días, o
 * `null` cuando la cuenta sí admite pedirlas en la consulta y no hace falta
 * rescatar nada.
 *
 * Es una consulta por día —con el rango puesto en el selector, no una por
 * campaña—, así que el coste crece con los días pedidos y no con las campañas
 * que tenga la cuenta.
 */
function vistasDeRescate() {
  if (!CAMPOS_OMITIDOS['metrics.video_views']) return null;

  console.log(
      `Rescatando reproducciones diarias de los últimos ${DIAS_VISTAS_DIARIAS} días.`);

  const mapa = {};

  for (const dia of ultimosDias(DIAS_VISTAS_DIARIAS)) {
    try {
      for (const campana of AdsApp.videoCampaigns().forDateRange(dia, dia).get()) {
        const reproducciones = vistas(campana, [dia, dia]);

        if (reproducciones > 0) mapa[`${campana.getId()}|${dia}`] = reproducciones;
      }
    } catch (error) {
      console.log(`Sin reproducciones del ${dia}: ${error}`);
    }
  }

  return mapa;
}

/** Los últimos `total` días, del más antiguo al más reciente, en `YYYYMMDD`. */
function ultimosDias(total) {
  const dias = [];

  for (let atras = total; atras >= 1; atras--) {
    dias.push(hoy('yyyyMMdd', atras));
  }

  return dias;
}

/** Fecha de la cuenta con `atras` días de resta, en el formato que se le pida. */
function hoy(formato, atras) {
  const fecha = new Date(Date.now() - (atras || 0) * 86400000);

  return Utilities.formatDate(
      fecha, AdsApp.currentAccount().getTimeZone(), formato);
}

/**
 * Fecha de la campaña en `YYYY-MM-DD`, o `null` si la entidad no la tiene.
 * `getEndDate` devuelve `null` en las campañas sin fecha de fin, que son la
 * mayoría de las que siguen corriendo.
 */
function fecha(campana, metodo) {
  if (!campana) return null;

  try {
    const valor = campana[metodo]();

    if (!valor) return null;

    return [
      valor.year,
      String(valor.month).padStart(2, '0'),
      String(valor.day).padStart(2, '0'),
    ].join('-');
  } catch (error) {
    return null;
  }
}

/**
 * Traduce las métricas de Google al vocabulario común de adsme. Google no
 * reporta alcance ni interacciones sociales por campaña, así que van a cero
 * para que las tarjetas del reporte no muestren un hueco. Las reproducciones se
 * completan aparte cuando la consulta no pudo traerlas (ver `vistas`).
 */
function metricas(origen) {
  const datos = origen || {};

  return {
    spend: Number(datos.costMicros || 0) / 1000000,
    impressions: Number(datos.impressions || 0),
    clicks: Number(datos.clicks || 0),
    reach: 0,
    videoPlays: Number(datos.videoViews || 0),
    engagement: Number(datos.engagements || 0),
    comments: 0,
    shares: 0,
    reactions: 0,
  };
}

/**
 * Ejecuta la consulta con los campos opcionales incluidos y va descartando solo
 * los que la API rechaza, que es lo que el propio error enumera.
 *
 * Renunciar a todos los opcionales al primer fallo perdía datos que la cuenta sí
 * soporta: basta con que un campo no exista para quedarse también sin el tipo de
 * campaña y sin las interacciones.
 *
 * El error de campo desconocido salta al recorrer el iterador, no al crearlo,
 * así que las filas hay que materializarlas dentro del try para poder capturarlo.
 */
function buscarTolerante(base, opcionales, resto) {
  let campos = base.concat(opcionales.filter((campo) => !CAMPOS_OMITIDOS[campo]));

  for (let intento = 0; intento < 3; intento++) {
    try {
      return recolectar(campos, resto);
    } catch (error) {
      const rechazados = camposRechazados(String(error));

      // Un error que no sea de campo desconocido no se arregla reintentando.
      if (rechazados.length === 0) throw error;

      console.log(`Campos no soportados, se omiten: ${rechazados.join(', ')}`);

      for (const campo of rechazados) CAMPOS_OMITIDOS[campo] = true;

      campos = campos.filter((campo) => rechazados.indexOf(campo) === -1);
    }
  }

  return recolectar(base, resto);
}

/** Saca de UNRECOGNIZED_FIELD los nombres de campo que vienen entrecomillados. */
function camposRechazados(mensaje) {
  const encontrados = mensaje.match(/'[a-z_]+\.[a-z_]+'/g) || [];

  return encontrados.map((texto) => texto.replace(/'/g, ''));
}

/** Vuelca el iterador de la consulta en un array. */
function recolectar(campos, resto) {
  const filas = [];

  for (const fila of AdsApp.search(`SELECT ${campos.join(', ')} ${resto}`)) {
    filas.push(fila);
  }

  return filas;
}

/** Manda la serie diaria troceada; un único cuerpo con un año entero no pasa. */
function enviarSerie(customerId, dias) {
  for (let inicio = 0; inicio < dias.length; inicio += TAMANO_LOTE) {
    enviar({
      customerId: customerId,
      campaigns: [],
      daily: dias.slice(inicio, inicio + TAMANO_LOTE),
    });
  }
}

/**
 * Envía un lote a adsme reintentando los fallos temporales. Un 4xx no se
 * reintenta: significa secreto incorrecto o datos mal formados, y repetirlo
 * daría el mismo resultado.
 */
function enviar(cuerpo) {
  const opciones = {
    method: 'POST',
    contentType: 'application/json',
    headers: {'x-adsme-secret': ADSME_SECRET},
    payload: JSON.stringify(cuerpo),
    muteHttpExceptions: true,
  };

  for (let intento = 0; intento < 3; intento++) {
    const respuesta = UrlFetchApp.fetch(ADSME_URL + RUTA_INGESTA, opciones);
    const codigo = respuesta.getResponseCode();

    if (codigo < 300) return;

    if (codigo < 500) {
      throw new Error(
          `adsme rechazó el envío (${codigo}): ${respuesta.getContentText()}`);
    }

    Utilities.sleep(2000 * Math.pow(2, intento));
  }

  throw new Error('adsme no respondió tras 3 intentos.');
}
