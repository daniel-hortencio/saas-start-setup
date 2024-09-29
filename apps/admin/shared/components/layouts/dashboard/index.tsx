import { Button, Container, Icon, Toaster } from "@repo/ui/components";
import { ReactNode } from "react";
import { DashboardHeader } from "../header";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-screen">
      <DashboardHeader />
      <Container className="pt-16 min-h-screen flex gap-5">
        <nav className="flex flex-col w-52 gap-2">
          <Link href="/dashboard" className="w-full">
            <Button
              variant="ghost"
              className="w-full flex justify-start items-center gap-2"
            >
              <Icon name="House" size={24} />
              Home
            </Button>
          </Link>
          <Link href="/dashboard/users" className="w-full">
            <Button
              variant="ghost"
              className="w-full flex justify-start items-center gap-2"
            >
              <Icon name="Users" size={24} />
              Users
            </Button>
          </Link>
        </nav>
        <main className="flex-auto">{children}</main>
      </Container>
      <Toaster />
    </div>
  );
};
