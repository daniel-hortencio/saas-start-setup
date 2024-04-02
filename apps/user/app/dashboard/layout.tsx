import { Icon } from "@repo/ui/components";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-screen grid grid-cols-[16rem_1fr]">
      <nav className="bg-background flex-auto shadow-2xl">
        <p className="p-2">Logo</p>
        <Link href="/dashboard/transactions" className="p-2 flex items-center">
          <Icon name="HandCoins" />
          <span className="ml-2">Transações</span>
        </Link>
        <Link href="/dashboard/categories" className="p-2 flex items-center">
          <Icon name="Tag" />
          <span className="ml-2">Categories</span>
        </Link>
      </nav>

      <div className="flex flex-col">
        <header className="bg-background shadow-sm p-2">
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
