"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { DashboardLayout } from "../../shared/components/layouts/dashboard";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  return status === "authenticated" ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <></>
  );
}
