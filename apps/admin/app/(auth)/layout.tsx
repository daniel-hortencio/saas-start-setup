import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../shared/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
