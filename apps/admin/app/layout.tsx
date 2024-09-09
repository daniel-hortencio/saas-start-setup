import "@repo/ui/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}): JSX.Element {
  console.log({ params });
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
