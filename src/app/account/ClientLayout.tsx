"use client"; // Mark this file as a client component

import { SessionProvider } from "next-auth/react";
<<<<<<< HEAD
import Navbar from "../../components/atomics/navbar.module";
=======
import Navbar from "../components/molecules/navbar.module";
>>>>>>> 723e2eed32646524949430a91fb1f3c3d9431cd6

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