/**
 * Exporta las campañas de Google Ads a adsme.
 *
 * Este archivo NO forma parte del build de Next: se pega tal cual dentro de
 * Google Ads, en Herramientas y configuración → Acciones masivas → Scripts.
 * Al correr ahí ya está autenticado por la propia sesión de Google, así que no
 * necesita developer token, OAuth ni refresh token.
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

/** Días de serie diaria que se reenvían en cada ejecución. */
const DIAS_HISTORICO = 30;

/** Filas por petición. Trocear evita cuerpos enormes y timeouts. */
const TAMANO_LOTE = 2000;

const RUTA_INGESTA = '/api/google-ads/ingest';

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

/** Exporta campañas y serie diaria de la cuenta en la que está el script. */
function exportarCuentaActual() {
  const customerId = AdsApp.currentAccount().getCustomerId().replace(/-/g, '');

  const campanas = leerCampanas();
  const dias = leerSerieDiaria();

  console.log(
      `${customerId}: ${campanas.length} campañas, ${dias.length} días.`);

  // Las campañas van primero y solas: la serie diaria de adsme cuelga de ellas.
  enviar({customerId: customerId, campaigns: campanas, daily: []});

  for (let inicio = 0; inicio < dias.length; inicio += TAMANO_LOTE) {
    enviar({
      customerId: customerId,
      campaigns: [],
      daily: dias.slice(inicio, inicio + TAMANO_LOTE),
    });
  }
}

/**
 * Acumulado de cada campaña. Sin filtro de fecha, Google devuelve las métricas
 * de toda la vida de la campaña, que es lo que adsme guarda en `campaigns`.
 */
function leerCampanas() {
  const filas = AdsApp.search(`
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      campaign.start_date,
      campaign.end_date,
      metrics.cost_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.video_views,
      metrics.engagements
    FROM campaign
    WHERE campaign.status != 'REMOVED'
  `);

  const campanas = [];

  for (const fila of filas) {
    campanas.push(Object.assign(metricas(fila.metrics), {
      externalCampaignId: String(fila.campaign.id),
      name: fila.campaign.name,
      status: fila.campaign.status,
      objective: fila.campaign.advertisingChannelType || null,
      startsAt: fila.campaign.startDate || null,
      endsAt: fila.campaign.endDate || null,
    }));
  }

  return campanas;
}

/** Un registro por campaña y día, que es la serie que alimenta los reportes. */
function leerSerieDiaria() {
  const filas = AdsApp.search(`
    SELECT
      campaign.id,
      segments.date,
      metrics.cost_micros,
      metrics.impressions,
      metrics.clicks,
      metrics.video_views,
      metrics.engagements
    FROM campaign
    WHERE segments.date DURING LAST_${DIAS_HISTORICO}_DAYS
  `);

  const dias = [];

  for (const fila of filas) {
    dias.push(Object.assign(metricas(fila.metrics), {
      externalCampaignId: String(fila.campaign.id),
      date: fila.segments.date,
    }));
  }

  return dias;
}

/**
 * Traduce las métricas de Google al vocabulario común de adsme. Google no
 * reporta alcance ni interacciones sociales por campaña, así que van a cero
 * para que las tarjetas del reporte no muestren un hueco.
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
