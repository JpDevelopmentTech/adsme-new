/** Parte una lista en bloques de como mucho `size` elementos. */
export function chunk<TItem>(items: TItem[], size: number): TItem[][] {
  const blocks: TItem[][] = [];

  for (let index = 0; index < items.length; index += size) {
    blocks.push(items.slice(index, index + size));
  }

  return blocks;
}
