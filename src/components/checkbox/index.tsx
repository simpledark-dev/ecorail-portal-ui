import { cn } from "@/utils/common.util";
import { Icons } from "../icons";
import { useControllableState } from "@/hooks/useControllableState";
import { cva, VariantProps } from "class-variance-authority";

const themeVariants = cva("", {
  variants: {
    size: {
      md: "h-5 w-5",
      sm: "h-4 w-4",
    },
  },
});

interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size" | "checked" | "onChange">,
    VariantProps<typeof themeVariants> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  as?: React.ElementType;
}

export const Checkbox = (props: CheckboxProps) => {
  const {
    checked: checkedProp,
    onChange: onChangeProp,
    className,
    size = "md",
    disabled,
    label,
    id,
    as: Component = "button",
  } = props;

  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: false,
    onChange: onChangeProp,
  });

  const handleClick = () => {
    if (disabled) return;
    setChecked(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Component
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={label}
      id={id}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-[4px] border border-gray-400 p-[1px] transition-colors duration-100",
        className,
        { "border-blue-500 bg-blue-500": checked },
        { "bg-neutral-100": !checked },
        { "cursor-not-allowed opacity-50": disabled },
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    >
      <Icons.Check
        className={cn(
          "shrink-0 fill-white opacity-0 transition-opacity duration-100",
          themeVariants({ size }),
          { "opacity-100": checked },
        )}
      />
    </Component>
  );
};
