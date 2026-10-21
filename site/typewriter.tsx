"use client";

import { useEffect, useState } from "react";
import styles from "./site.module.css";

// Digita o texto letra a letra. O que falta digitar fica no lugar, transparente: o título já ocupa
// as linhas finais desde o início e nada abaixo dele pula. Leitor de tela recebe o texto inteiro.
export function Typewriter({ text, speed = 45, delay = 300 }: { text: string; speed?: number; delay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(
      () => {
        interval = setInterval(() => {
          setCount((current) => {
            const next = reduced ? text.length : current + 1;
            if (next >= text.length) clearInterval(interval);
            return Math.min(next, text.length);
          });
        }, speed);
      },
      reduced ? 0 : delay,
    );
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        <span className={styles.typed}>{text.slice(0, count)}</span>
        <span className={styles.untyped}>{text.slice(count)}</span>
      </span>
    </>
  );
}
