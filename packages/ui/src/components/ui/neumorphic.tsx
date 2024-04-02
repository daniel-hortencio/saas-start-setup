import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Neumorphic = ({ children, className }: Props) => (
  <div
    className={cn(
      "relative shadow-[.2rem_.2rem_.4rem_rgba(0,0,0,0.1)]",
      className,
    )}
  >
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full shadow-[-.2rem_-.2rem_.4rem_rgba(255,255,255,0.7)]",
        className,
      )}
    />
    {children}
  </div>
);
