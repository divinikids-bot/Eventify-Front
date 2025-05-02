"use client"; // Mark this file as a client component

import { SessionProvider } from "next-auth/react";
import Navbar from "../components/molecules/navbar.module";

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