"use client";

import { ACCOUNT_IDS_FIELD } from "@/constants/connections.constants";
import type { AccountPickerRowProps } from "@/types/account-picker.types";

/** Fila marcable del selector: una cuenta publicitaria y su identificador. */
export function AccountPickerRow({
  option,
  isChecked,
  onToggle,
}: AccountPickerRowProps) {
  return (
    <li>
      <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 transition-colors duration-150 hover:bg-white/60">
        <input
          type="checkbox"
          name={ACCOUNT_IDS_FIELD}
          value={option.id}
          checked={isChecked}
          onChange={() => onToggle(option.id)}
          className="size-[15px] shrink-0 accent-accent"
        />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[13px] font-normal text-text-primary">
            {option.name}
          </span>
          <span className="truncate text-[11px] font-light text-text-muted">
            {option.hint}
          </span>
        </span>
      </label>
    </li>
  );
}
