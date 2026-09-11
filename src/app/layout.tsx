import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import QueryProvider from "@/components/QueryProvider";
import ReduxProvider from "@/components/ReduxProvider";

import "./styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Starsoft Marketplace",
  description: "Marketplace de produtos digitais",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={poppins.className} suppressHydrationWarning>
      <body>
        <>
          <QueryProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </QueryProvider>
        </>
      </body>
    </html>
  );
}
