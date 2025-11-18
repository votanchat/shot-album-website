"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, JSX } from "react";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        filled: "shadow-sm hover:opacity-90",
        outline: "bg-white border shadow-sm hover:bg-gray-50",
        outlineTheme: "bg-white border-2 shadow-sm hover:opacity-80",
        ghost: "hover:bg-black/5",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 py-2 text-sm",
        md: "h-[60px] px-[22px] py-4 text-lg",
        lg: "h-16 px-8 py-5 text-xl",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        className: "text-white",
      },
      {
        variant: "outline",
        className: "border-gray-300 text-gray-700",
      },
    ],
    defaultVariants: {
      variant: "filled",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, children, style, ...props },
    ref
  ): JSX.Element => {
    // Generate dynamic styles based on variant
    const dynamicStyles: React.CSSProperties = {
      ...style,
    };

    if (variant === "filled") {
      dynamicStyles.backgroundColor = "var(--color-primary)";
    } else if (variant === "outlineTheme") {
      dynamicStyles.borderColor = "var(--color-primary)";
      dynamicStyles.color = "var(--color-primary-1)";
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        style={dynamicStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

