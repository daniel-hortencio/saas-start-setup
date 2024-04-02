import { cn } from "@ui/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: Props) => (
  <div className={cn("container", className)}>{children}</div>
);
