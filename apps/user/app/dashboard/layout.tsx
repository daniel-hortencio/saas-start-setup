"use client";

import { Icon } from "@repo/ui/components";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="h-screen grid grid-cols-[16rem_1fr]">
      <nav className="flex-auto">
        <p className="p-2">Logo</p>
        <Link
          href="/dashboard/transactions"
          className="p-2 flex items-center space-x-2"
        >
          <Icon name="HandCoins" />
          <span>Transações</span>
        </Link>
        <Link
          href="/dashboard/categories"
          className="p-2 flex items-center space-x-2"
        >
          <Icon name="Tag" />
          <span>Categories</span>
        </Link>
        <button
          onClick={() => signOut()}
          className="p-2 flex items-center space-x-2"
        >
          <Icon name="SignOut" />
          <span>Sair</span>
        </button>
      </nav>

      <div className="flex flex-col">
        <header className="shadow-sm p-2">
          <p>Dashboard</p>
        </header>
        <main className="flex-auto w-full border overflow-y-auto p-2">
          {children}
        </main>
        <footer className="text-center p-2">
          <p className="text-sm">Powered by DaniDev</p>
        </footer>
      </div>
    </div>
  );
}
