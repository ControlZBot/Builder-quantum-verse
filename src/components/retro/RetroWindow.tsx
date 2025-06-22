import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RetroWindowProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleBar?: boolean;
  children: ReactNode;
}

export function RetroWindow({
  className,
  title,
  titleBar = false,
  children,
  ...props
}: RetroWindowProps) {
  return (
    <div className={cn("retro-window", className)} {...props}>
      {titleBar && (
        <div className="bg-retro-blue-600 text-white font-retro font-bold text-xs px-2 py-1 border-b border-retro-gray-700">
          {title || "Window"}
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
}
