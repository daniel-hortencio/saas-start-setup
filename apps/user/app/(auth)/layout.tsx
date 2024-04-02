"use client";

import { Card } from "@repo/ui/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getTitle(pathname: string) {
  if (pathname === "/") return "SignIn";
  if (pathname === "/sign-up") return "SignUp";
  if (pathname === "/recover-password") return "Recover Password";
}

function getLinks(pathname: string) {
  if (pathname === "/")
    return (
      <>
        <Link href="/recover-password">Forgot Password</Link>
        <Link href="/sign-up">SignUp</Link>
      </>
    );
  if (pathname === "/sign-up") return <Link href="/">SignIn</Link>;
  if (pathname === "/recover-password") return <Link href="/">SignIn</Link>;
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="h-screen flex flex-col justify-between">
      <Card className="flex items-center flex-col justify-center shadow-md w-full max-w-xs mx-auto my-auto bg-background rounded-md">
        <h1 className="text-xl font-semibold w-full px-5 pt-5">
          {getTitle(pathname)}
        </h1>
        <main className="p-5 w-full">{children}</main>
        <div className="flex items-center justify-between w-full border-t-background-dark/50 border-t-[1px] px-5 py-2">
          {getLinks(pathname)}
        </div>
      </Card>
      <footer className="text-center p-2">
        <p className="text-sm">Powered by DaniDev</p>
      </footer>
    </div>
  );
}
