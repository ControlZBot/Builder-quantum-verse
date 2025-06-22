import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RetroCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const RetroCheckbox = forwardRef<HTMLInputElement, RetroCheckboxProps>(
  ({ className, label, checked, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            ref={ref}
            {...props}
          />
          <div
            className={cn(
              "w-4 h-4 border-2 border-retro-gray-700 bg-retro-gray-50",
              "flex items-center justify-center",
              "transition-none",
              checked && "bg-retro-green-500",
              className,
            )}
            style={{
              boxShadow: "inset 1px 1px 2px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            {checked && <div className="text-white text-xs font-bold">✓</div>}
          </div>
        </div>
        {label && (
          <span className="text-xs font-retro font-bold text-retro-gray-800">
            {label}
          </span>
        )}
      </label>
    );
  },
);

RetroCheckbox.displayName = "RetroCheckbox";

export { RetroCheckbox };
