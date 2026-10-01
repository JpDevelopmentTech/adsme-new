/** Anchos en px de las tres barras inclinadas de la «E» del logotipo. */
const BAR_WIDTHS = [14, 11, 8] as const;

/** Las tres barras de la «E» de AdsME: marcan el ítem activo del menú. */
export function BrandBarsMark() {
  return (
    <span aria-hidden className="flex size-[18px] shrink-0 flex-col justify-center gap-[3px]">
      {BAR_WIDTHS.map((width) => (
        <span key={width} className="h-[3px] rounded-[2px] bg-text-primary" style={{ width }} />
      ))}
    </span>
  );
}
