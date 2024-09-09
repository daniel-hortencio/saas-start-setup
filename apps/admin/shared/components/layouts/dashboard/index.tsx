import { Container, Toaster } from "@repo/ui/components";
import { ReactNode } from "react";
import { DashboardHeader } from "../header";

type Props = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="test min-h-screen w-screen">
      <DashboardHeader />
      <Container className="pt-16">{children}</Container>
      <Toaster />
    </div>
  );
};
