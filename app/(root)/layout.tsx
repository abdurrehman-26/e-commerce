import React from "react";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";

export default function StoreFrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="p-1 sm:px-4 md:px-6 mx-auto max-w-7xl min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
