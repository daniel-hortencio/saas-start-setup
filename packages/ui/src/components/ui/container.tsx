import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: Props) => (
  <div className={cn("w-full px-5 max-w-screen-2xl mx-auto", className)}>
    {children}
  </div>
);
