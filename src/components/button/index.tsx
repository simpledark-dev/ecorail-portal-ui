import { cn } from "@/utils/common.util";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const themeVariants = cva(
  "px-4 py-[10px] text-navy-700 rounded-[8px] whitespace-nowrap text-sm font-medium transition-colors duration-150 flex items-center justify-center flex-nowrap disabled:opacity-50 disabled:!cursor-not-allowed",
  {
    variants: {
      variant: {
        default: cn("bg-white", "hover:bg-gray-50", "active:bg-gray-100"),
        brand: cn("bg-brand-500 text-white", "hover:bg-brand-400 active:bg-brand-600"),
        navy: cn("bg-navy-500 text-white", "hover:bg-navy-400 active:bg-navy-600"),
        neutral: cn("bg-neutral-500 text-white", "hover:bg-neutral-400 active:bg-neutral-600"),
        "neutral-light": cn(
          "bg-neutral-300 text-white",
          "hover:bg-neutral-200 active:bg-neutral-400",
        ),
        gray: cn("bg-gray-500", "hover:bg-gray-400 active:bg-gray-600"),
        "gray-light": cn("bg-gray-300", "hover:bg-gray-200 active:bg-gray-400"),
        red: cn("bg-red-500 text-white", "hover:bg-red-400 active:bg-red-600"),
        green: cn("bg-green-500 text-white", "hover:bg-green-400 active:bg-green-600"),
        blue: cn("bg-blue-500 text-white", "hover:bg-blue-400 active:bg-blue-600"),
        orange: cn("bg-orange-500 text-white", "hover:bg-orange-400 active:bg-orange-600"),
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themeVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, children, variant = "default", ...rest } = props;

  return (
    <button {...rest} ref={ref} className={cn(themeVariants({ variant }), className)}>
      {children}
    </button>
  );
});

Button.displayName = "UI.Button";
