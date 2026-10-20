"use client";

import { useSyncExternalStore } from "react";
import { Button, Icon, Tooltip } from "@phsa.tec/design-system-react/react";
import { Moon } from "@phsa.tec/design-system-react/icons/moon";
import { Sun } from "@phsa.tec/design-system-react/icons/sun";

// O tema inicial é aplicado por um script no <head> (app/layout.tsx), antes da hidratação.
// A fonte da verdade é a classe `dark` no <html>.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["class"] });
  return () => observer.disconnect();
};
const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const label = dark ? "Tema claro" : "Tema escuro";
  return (
    <Tooltip text={label}>
      <Button slot="trigger" type="button" variant="ghost" size="icon" aria-label={label} onClick={toggle}>
        <Icon icon={dark ? Sun : Moon} size="sm" />
      </Button>
    </Tooltip>
  );
}
