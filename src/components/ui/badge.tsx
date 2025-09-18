import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white",
    secondary: "bg-slate-200 text-slate-800",
    outline: "border border-slate-300 text-slate-700",
  };
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
};