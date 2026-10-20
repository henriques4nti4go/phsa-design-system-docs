"use client";

import type { ReactNode } from "react";
import type { NavGroup } from "@/docs/server";
import { DocsNav } from "./docs-nav";
import styles from "./site.module.css";

export function DocsShell({ groups, children }: { groups: NavGroup[]; children: ReactNode }) {
  return (
    <div className={`${styles.container} ${styles.docsGrid}`}>
      <aside className={styles.sidebar}>
        <DocsNav groups={groups} />
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
