"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactQueryClientProvider } from "../shared/components/ReactQuery/client-provider";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  /*  const { status } = useSession();

  if (status === "loading") return <p>Carregando...</p>; */

  return (
    <SessionProvider>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
    </SessionProvider>
  );
}
