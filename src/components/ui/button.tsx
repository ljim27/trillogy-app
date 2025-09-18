import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  size?: "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "sm", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-md";
    const variants: Record<string, string> = {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      outline: "border border-slate-300 hover:bg-slate-100",
    };
    const sizes: Record<string, string> = {
      sm: "px-3 py-1.5 text-sm",
      lg: "px-6 py-3 text-base",
      icon: "p-2",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";