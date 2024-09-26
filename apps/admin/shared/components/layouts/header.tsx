import { Container } from "@repo/ui/components";
import { DashboardUserMenu } from "./user-menu";
import { DashboardMobileMenu } from "./mobile-menu";

export const DashboardHeader = () => {
  return (
    <header className="fixed w-screen flex items-center h-14 bg-white">
      <Container className="flex items-center justify-between">
        <strong className="text-2xl">Logo</strong>

        <div className="xl:hidden">
          <DashboardMobileMenu />
        </div>
        <div className="hidden xl:block">
          <DashboardUserMenu />
        </div>
      </Container>
    </header>
  );
};
