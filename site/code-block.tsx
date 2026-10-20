"use client";

import { useEffect, useMemo, useState } from "react";
import { highlight } from "sugar-high";
import { Button, Icon, ScrollArea, Separator, Stack, Text } from "@phsa.tec/design-system-react/react";
import { Check } from "@phsa.tec/design-system-react/icons/check";
import { Copy } from "@phsa.tec/design-system-react/icons/copy";
import styles from "./site.module.css";

type Props = {
  code: string;
  label?: string;
  /** `tsx` ganha realce de sintaxe; `bash` mostra o prompt `$`. */
  language?: "tsx" | "bash";
  /** Sem borda e sem cantos: para encaixar dentro de outra moldura (exemplos). */
  attached?: boolean;
};

export function CodeBlock({ code, label, language = "tsx", attached = false }: Props) {
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => (language === "tsx" ? highlight(code) : null), [code, language]);
  const multiline = code.includes("\n");

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {}
  };

  return (
    // Segue o tema da página; as cores de sintaxe trocam com o `.dark` (site.module.css).
    <div className={styles.codeBlock}>
      <Stack background="muted" radius={attached ? "none" : "lg"} bordered={!attached} gap="none">
        <Stack direction="row" align="center" justify="between" gap="sm" padding="xs">
          <Stack padding="xs">
            <Text variant="small" tone="muted" as="span">
              {label ?? (language === "bash" ? "Terminal" : "TSX")}
            </Text>
          </Stack>
          <Button type="button" variant="ghost" size="sm" aria-label="Copiar código" onClick={copy}>
            <Icon icon={copied ? Check : Copy} size="sm" tone={copied ? "success" : "inherit"} />
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </Stack>
        <Separator />
        <ScrollArea orientation="horizontal">
          <Stack padding="md">
            <pre className={`${styles.code} ${multiline ? styles.numbered : ""}`}>
              {html !== null ? (
                <code dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <code>
                  <span className={styles.prompt}>$ </span>
                  {code}
                </code>
              )}
            </pre>
          </Stack>
        </ScrollArea>
      </Stack>
    </div>
  );
}

/** Texto do manifesto: só trata `código` entre crases. */
export function RichText({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i} className={styles.inlineCode}>
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}
