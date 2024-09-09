"use client";

import { SessionProvider } from "next-auth/react";
import { ReactQueryClientProvider } from "../shared/components/ReactQuery/client-provider";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
    </SessionProvider>
  );
}
