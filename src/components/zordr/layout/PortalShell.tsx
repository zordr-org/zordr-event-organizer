import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import PortalHeader from "./PortalHeader";

export default function PortalShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f8fafb] text-[#111827]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1">
          <PortalHeader />

          {children}
        </section>
      </div>
    </main>
  );
}