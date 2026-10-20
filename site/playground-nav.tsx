"use client";

import { usePathname } from "next/navigation";
import { Stack, Text } from "@phsa.tec/design-system-react/react";
import { NavLink } from "./nav-link";
import { PLAYGROUND_EXAMPLES } from "./playground";
import styles from "./site.module.css";

export function PlaygroundHeader() {
  const pathname = usePathname();
  const current = PLAYGROUND_EXAMPLES.find((example) => pathname === `/playground/${example.slug}`);

  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Text variant="h1" className={styles.sectionTitle}>
          Playground
        </Text>
        <Text variant="lead" tone="muted">
          Telas completas feitas só com componentes do design system.{current ? ` ${current.description}` : ""}
        </Text>
      </Stack>
      <nav aria-label="Exemplos" className={styles.examplesNav}>
        {PLAYGROUND_EXAMPLES.map((example) => (
          <NavLink
            key={example.slug}
            href={`/playground/${example.slug}`}
            className={styles.exampleTab}
            aria-current={current === example ? "page" : undefined}
          >
            {example.label}
          </NavLink>
        ))}
      </nav>
    </Stack>
  );
}
