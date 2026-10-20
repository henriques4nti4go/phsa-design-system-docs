"use client";

import type { ReactNode } from "react";
import { Toaster } from "@phsa.tec/design-system-react/react";
import type { NavGroup } from "@/docs/server";
import { SiteHeader } from "./site-header";

export function SiteShell({ groups, children }: { groups: NavGroup[]; children: ReactNode }) {
  return (
    <>
      <SiteHeader groups={groups} />
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
