"use client";

import { useEffect, useState } from "react";
import { Stack, Text } from "@phsa.tec/design-system-react/react";
import { NavLink } from "./nav-link";
import styles from "./site.module.css";

export type TocItem = { id: string; label: string; nested?: boolean };

/** Índice "Nesta página", com a seção visível destacada. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Conta como "atual" a seção que está no terço de cima da tela.
      { rootMargin: "-80px 0px -66% 0px" },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <Stack as="nav" gap="sm" aria-label="Nesta página">
      <Text variant="small" weight="semibold" as="span">
        Nesta página
      </Text>
      <Stack gap="none">
        {items.map((item) => (
          <NavLink
            key={item.id}
            href={`#${item.id}`}
            className={`${styles.tocLink} ${item.nested ? styles.tocNested : ""}`}
            aria-current={active === item.id ? "true" : undefined}
          >
            {item.label}
          </NavLink>
        ))}
      </Stack>
    </Stack>
  );
}
