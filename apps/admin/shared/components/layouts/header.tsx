import { Container } from "@repo/ui/components";
import { DashboardUserMenu } from "./user-menu";

export const DashboardHeader = () => {
  return (
    <header className="fixed w-screen flex items-center h-12 bg-white test">
      <Container className="flex items-center justify-between">
        <strong className="text-2xl">Logo</strong>
        <DashboardUserMenu />
      </Container>
    </header>
  );
};
