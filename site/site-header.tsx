"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  Dialog,
  Icon,
  Sheet,
  Tooltip,
} from "@phsa.tec/design-system-react/react";
import { Menu } from "@phsa.tec/design-system-react/icons/menu";
import { Search } from "@phsa.tec/design-system-react/icons/search";
import type { PhsaCommand } from "@phsa.tec/design-system-react/command";
import type { NavGroup } from "@/docs/server";
import { GitHub, Logo, REPOSITORY } from "./brand";
import { DocsNav } from "./docs-nav";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import styles from "./site.module.css";

export function SiteHeader({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const inDocs = pathname.startsWith("/components");
  const command = useRef<PhsaCommand>(null);

  // O Dialog foca o primeiro foco dele (o fechar); a phsa-command não tem `focus()`, então o
  // foco vai direto para o campo de busca dela.
  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => command.current?.shadowRoot?.querySelector("input")?.focus(), 50);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  // ⌘K / Ctrl+K abre a busca de qualquer página.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const topLink = (href: string, label: string, active: boolean) => (
    <NavLink href={href} className={styles.topLink} aria-current={active ? "page" : undefined}>
      {label}
    </NavLink>
  );

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        {inDocs && (
          <div className={styles.mobileOnly}>
            <Button type="button" variant="ghost" size="icon" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
              <Icon icon={Menu} size="sm" />
            </Button>
          </div>
        )}

        <NavLink href="/" className={styles.brand}>
          <Logo />
          PHSA Design System
        </NavLink>

        <div className={styles.desktopOnly}>
          {topLink("/components", "Componentes", inDocs)}
          {topLink("/playground", "Playground", pathname === "/playground")}
        </div>

        <div className={styles.spacer} />

        <div className={styles.desktopOnly}>
          <button type="button" className={styles.searchTrigger} onClick={() => setSearchOpen(true)}>
            <Icon icon={Search} size="sm" />
            Buscar componentes…
            <kbd className={styles.kbd}>Ctrl K</kbd>
          </button>
        </div>
        <div className={styles.mobileOnly}>
          <Button type="button" variant="ghost" size="icon" aria-label="Buscar" onClick={() => setSearchOpen(true)}>
            <Icon icon={Search} size="sm" />
          </Button>
        </div>

        <Tooltip text="GitHub">
          <Button slot="trigger" type="button" variant="ghost" size="icon" aria-label="GitHub" onClick={() => window.open(REPOSITORY, "_blank")}>
            <Icon icon={GitHub} size="sm" />
          </Button>
        </Tooltip>
        <ThemeToggle />
      </div>

      <Sheet open={menuOpen} side="left" heading="Componentes" onClose={() => setMenuOpen(false)}>
        <DocsNav groups={groups} onNavigate={() => setMenuOpen(false)} />
      </Sheet>

      <Dialog open={searchOpen} heading="Buscar componentes" size="sm" onClose={() => setSearchOpen(false)}>
        {/* Remonta a cada abertura para começar com a busca vazia. */}
        {searchOpen && (
          <Command
            ref={command}
            placeholder="Digite o nome de um componente…"
            onPhsaSelect={(e) => {
              setSearchOpen(false);
              router.push(`/components/${(e as CustomEvent<{ value: string }>).detail.value}`);
            }}
          >
            {groups.map((group) => (
              <CommandGroup key={group.id} label={group.label}>
                {group.items.map((item) => (
                  <CommandItem key={item.slug} value={item.slug}>
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </Command>
        )}
      </Dialog>
    </header>
  );
}
