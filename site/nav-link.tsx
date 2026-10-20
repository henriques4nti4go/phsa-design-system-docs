"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { Link } from "@phsa.tec/design-system-react/react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string; onNavigate?: () => void };

/** `phsa-link` com navegação do Next no cliente (Ctrl/Cmd+clique continua abrindo nova aba; `#âncora` fica nativo). */
export function NavLink({ href, onNavigate, ...props }: Props) {
  const router = useRouter();
  const external = /^https?:/.test(href);

  const handleClick = (e: MouseEvent) => {
    if (external || href.startsWith("#") || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate?.();
    router.push(href);
  };

  return <Link href={href} target={external ? "_blank" : undefined} {...props} onClick={handleClick} />;
}
