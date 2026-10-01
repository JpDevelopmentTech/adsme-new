/** Una página leída de PostgREST, con su error tal como lo devuelve el cliente. */
interface PageResult<TRow> {
  data: TRow[] | null;
  error: unknown;
}

/**
 * Lee una consulta página a página hasta agotarla. PostgREST recorta cada
 * respuesta al máximo de filas del proyecto sin señalarlo, así que una lectura
 * de una sola vez devolvería totales incompletos en los rangos largos. La
 * consulta debe ir ordenada por una clave única para que las páginas no se
 * solapen. Lanza el primer error que devuelva cualquier página.
 */
export async function collectPages<TRow>(
  fetchPage: (from: number, to: number) => PromiseLike<PageResult<TRow>>,
  pageSize: number,
): Promise<TRow[]> {
  const rows: TRow[] = [];

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await fetchPage(from, from + pageSize - 1);
    if (error) throw error;

    const page = data ?? [];
    rows.push(...page);

    if (page.length < pageSize) return rows;
  }
}
