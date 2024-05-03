"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { status } = useSession();

  if (status === "loading") return <p>Carregando...</p>;

  return <>{children}</>;
}
