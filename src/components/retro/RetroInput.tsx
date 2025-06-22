import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RetroInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const RetroInput = forwardRef<HTMLInputElement, RetroInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-xs font-retro font-bold text-retro-gray-800">
            {label}
          </label>
        )}
        <input
          className={cn("retro-input w-full", className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

RetroInput.displayName = "RetroInput";

export { RetroInput };
