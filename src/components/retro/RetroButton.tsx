import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
}

const RetroButton = forwardRef<HTMLButtonElement, RetroButtonProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    const baseClasses = "retro-button font-retro font-bold transition-none";

    const variantClasses = {
      default: "",
      primary: "primary",
      danger: "danger",
      success: "success",
    };

    const sizeClasses = {
      sm: "text-xs px-2 py-1",
      md: "text-xs px-3 py-1",
      lg: "text-sm px-4 py-2",
    };

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

RetroButton.displayName = "RetroButton";

export { RetroButton };
