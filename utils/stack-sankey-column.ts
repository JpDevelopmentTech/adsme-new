/**
 * Apila alturas de arriba abajo con un hueco entre ellas y una distancia mínima
 * entre centros, para que las etiquetas de nodos pequeños no se pisen.
 * Devuelve el desplazamiento de cada una y el alto total ocupado.
 */
export function stackSankeyColumn(heights: number[], gap: number, minSpacing: number): { offsets: number[]; extent: number } {
  const offsets: number[] = [];
  let bottom = 0;
  let center = 0;

  heights.forEach((height, index) => {
    const y = index === 0 ? 0 : Math.max(bottom + gap, center + minSpacing - height / 2);
    offsets.push(y);
    bottom = y + height;
    center = y + height / 2;
  });

  return { offsets, extent: bottom };
}
