import React from "react";
import { useControllableState } from "@/hooks/useControllableState";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/common.util";

const themeVariants = cva(
  "peer relative rounded-full bg-neutral-200 after:absolute after:start-[2px] after:top-[2px] after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:border-white peer-focus:outline-none",
  {
    variants: {
      size: {
        md: "h-5 w-12 after:h-4 after:w-4 peer-checked:after:translate-x-7",
        sm: "h-4 w-9 after:h-3 after:w-3 peer-checked:after:translate-x-5",
      },
    },
  },
);

interface ToggleButtonProps extends VariantProps<typeof themeVariants> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const ToggleButton = React.memo((props: ToggleButtonProps) => {
  const { checked: checkedProp, onChange: onChangeProp, disabled = false, size = "md" } = props;

  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    onChange: onChangeProp,
  });

  return (
    <label
      className={cn("inline-flex cursor-pointer items-center", {
        "cursor-not-allowed opacity-50": disabled,
      })}
    >
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        disabled={disabled}
      />
      <div className={themeVariants({ size })} />
      <span className="sr-only">Toggle</span>
    </label>
  );
});
ToggleButton.displayName = "UI.ToggleButton";
