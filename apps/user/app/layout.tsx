"use client";

import "@repo/ui/globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { ReactQueryClientProvider } from "../shared/components/ReactQuery/client-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
