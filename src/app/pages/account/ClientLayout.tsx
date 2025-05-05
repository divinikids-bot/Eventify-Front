"use client";

import { SessionProvider } from "next-auth/react";
// import Navbar from "../../../components/atomics/navbar.module";
import Navbar from "@/app/component/molecules/navbar.module";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
