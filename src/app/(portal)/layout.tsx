import type { ReactNode } from "react";

import PortalShell from "@/components/zordr/layout/PortalShell";

export default function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}