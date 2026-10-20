import { PlaygroundHeader } from "@/site/playground-nav";
import styles from "@/site/site.module.css";

export default function PlaygroundLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={`${styles.container} ${styles.playground}`}>
      <PlaygroundHeader />
      <div className={styles.exampleFrame}>{children}</div>
    </main>
  );
}
