"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Checkbox,
  Grid,
  Icon,
  Input,
  PatternInput,
  Progress,
  Separator,
  Stack,
  Switch,
  Text,
} from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";
import { ArrowRight } from "@phsa.tec/design-system-react/icons/arrow-right";
import { Boxes } from "@phsa.tec/design-system-react/icons/boxes";
import { Code } from "@phsa.tec/design-system-react/icons/code";
import { Layers } from "@phsa.tec/design-system-react/icons/layers";
import { Palette } from "@phsa.tec/design-system-react/icons/palette";
import { ShieldCheck } from "@phsa.tec/design-system-react/icons/shield-check";
import { Zap } from "@phsa.tec/design-system-react/icons/zap";
import { GitHub, Logo, REPOSITORY } from "./brand";
import type { IconType } from "./category-icons";
import { CodeBlock } from "./code-block";
import { NavLink } from "./nav-link";
import styles from "./site.module.css";
import { Typewriter } from "./typewriter";

const FEATURES: { icon: IconType; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "100% isolado",
    text: "Shadow DOM: o CSS da sua página não quebra os componentes, e o deles não vaza para a sua página.",
  },
  {
    icon: Zap,
    title: "Zero configuração",
    text: "Sem tailwind.config, sem CSS global, sem plugin de build. Instale, importe e use.",
  },
  {
    icon: Boxes,
    title: "Só o que você usa",
    text: "Um entry point por componente e um arquivo por ícone. Importar o botão não traz o calendário.",
  },
  {
    icon: Palette,
    title: "Tema por tokens",
    text: "Cores, raio e fonte em variáveis CSS que atravessam o Shadow DOM. Modo escuro com uma classe.",
  },
  {
    icon: Layers,
    title: "Formulários nativos",
    text: "FormData, required, reset e validação do navegador funcionam como nos inputs nativos.",
  },
  {
    icon: Code,
    title: "Qualquer framework",
    text: "Custom elements puros, com wrappers React tipados. Testado com React 19 e Next.js 16 com SSR.",
  },
];

const SNIPPET = `import { Button, Input, Stack } from "@phsa.tec/design-system-react/react";

export function Newsletter() {
  return (
    <Stack gap="sm">
      <Input type="email" label="E-mail" placeholder="voce@exemplo.com" />
      <Button block>Assinar</Button>
    </Stack>
  );
}`;

// Mesmas regras do app/globals.css.
const HOSTILE_CSS = `button {
  background: hotpink;
  font-family: "Comic Sans MS", cursive;
}

svg {
  width: 64px;
  stroke: lime;
  fill: red;
}`;

export function Landing({ version, componentCount }: { version: string; componentCount: number }) {
  const router = useRouter();

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroContent} ${styles.section}`}>
          <Stack align="center" gap="lg">
            <NavLink href="/components" className={styles.pill}>
              <span className={styles.pillTag}>v{version}</span>
              {componentCount} componentes prontos
              <Icon icon={ArrowRight} size="xs" />
            </NavLink>
            <Stack maxWidth="4xl" gap="lg" align="center">
              <Text variant="display" align="center" className={styles.heroTitle}>
                <Typewriter text="Componentes que funcionam em qualquer lugar." />
              </Text>
              <Stack maxWidth="2xl">
                <Text variant="lead" tone="muted" align="center" className={styles.heroLead}>
                  Web Components acessíveis e com tema, prontos para React e Next.js. O CSS do seu app não quebra nada,
                  e você não configura nada.
                </Text>
              </Stack>
            </Stack>
            <Stack direction="row" gap="sm" justify="center" wrap>
              <Button type="button" size="lg" onClick={() => router.push("/components")}>
                Começar
                <Icon icon={ArrowRight} size="sm" />
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={() => window.open(REPOSITORY, "_blank")}>
                <Icon icon={GitHub} size="sm" />
                GitHub
              </Button>
            </Stack>
            <Stack maxWidth="md">
              <CodeBlock code="npm install @phsa.tec/design-system-react" language="bash" />
            </Stack>
          </Stack>
        </div>
      </section>

      {/* Vitrine: componentes de verdade, não imagens */}
      <section className={styles.container}>
        <div className={styles.showcase}>
          <div className={styles.showcaseBar}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <Stack padding="lg">
            <Grid columns={3} stackBelow="md" gap="lg" align="start">
              <SignupCard />
              {/* No celular, três cards empilhados empurram o resto da página para longe: fica só o primeiro. */}
              <Stack hideBelow="md">
                <TeamCard />
              </Stack>
              <Stack hideBelow="md">
                <NotificationsCard />
              </Stack>
            </Grid>
          </Stack>
        </div>
      </section>

      {/* Prova do isolamento: o CSS hostil do globals.css é de verdade e atinge o botão nativo. */}
      <section className={`${styles.container} ${styles.section}`}>
        <Stack gap="xl">
          <SectionIntro
            eyebrow="Shadow DOM"
            title="Este site tem CSS hostil. Os componentes nem perceberam."
            lead="O CSS global desta página pinta todo botão de rosa e troca a fonte. Veja o que acontece com cada um."
          />
          <Grid columns={2} stackBelow="lg" gap="lg" align="stretch">
            <CodeBlock code={HOSTILE_CSS} label="app/globals.css" />
            <div className={styles.example}>
              <div className={styles.versus}>
                <div>
                  <Stack gap="sm" align="center">
                    <span className={styles.caption}>&lt;button&gt; nativo</span>
                    <button type="button" className={styles.nativeButton}>
                      Salvar
                    </button>
                    <Badge variant="destructive">Quebrou</Badge>
                  </Stack>
                </div>
                <div>
                  <Stack gap="sm" align="center">
                    <span className={styles.caption}>&lt;Button&gt; do PHSA</span>
                    <Button type="button" onClick={() => toast.success("Nenhum pixel rosa")}>
                      Salvar
                    </Button>
                    <Badge variant="success">Intacto</Badge>
                  </Stack>
                </div>
              </div>
            </div>
          </Grid>
        </Stack>
      </section>

      {/* Diferenciais */}
      <section className={`${styles.container} ${styles.section}`}>
        <div className={styles.split}>
          <SectionIntro
            align="start"
            eyebrow="Por que usar"
            title="Feito para não dar trabalho"
            lead="Bibliotecas em cima de frameworks de CSS costumam vazar para os dois lados. Esta faz o contrário."
          />
          <Grid columns={2} stackBelow="sm" gap="xl">
            {FEATURES.map((feature) => (
              <Stack key={feature.title} gap="sm">
                <span className={styles.featureIcon}>
                  <Icon icon={feature.icon} size="md" />
                </span>
                <Text variant="h4" as="h3">
                  {feature.title}
                </Text>
                <Text tone="muted" className={styles.featureText}>
                  {feature.text}
                </Text>
              </Stack>
            ))}
          </Grid>
        </div>
      </section>

      {/* Código e resultado lado a lado */}
      <section className={`${styles.container} ${styles.section}`}>
        <Stack gap="xl">
          <SectionIntro
            eyebrow="React"
            title="Escreva assim. Veja assim."
            lead="Componentes React tipados, com props e eventos como você espera."
          />
          <Grid columns={2} stackBelow="lg" gap="lg" align="stretch">
            <CodeBlock code={SNIPPET} label="newsletter.tsx" />
            <div className={styles.example}>
              <div className={styles.preview}>
                <Newsletter />
              </div>
            </div>
          </Grid>
        </Stack>
      </section>

      {/* Chamada final: a classe `navy` troca os tokens só aqui dentro. */}
      <section className={`${styles.container} ${styles.section}`}>
        <div className={`navy ${styles.band}`}>
          <Stack gap="lg" align="center">
            <Stack gap="sm" align="center">
              <span className={styles.eyebrow}>
                {componentCount} componentes · v{version}
              </span>
              <Text variant="h2" align="center" className={styles.sectionTitle}>
                Comece pelo componente que você precisa hoje
              </Text>
              <Stack maxWidth="xl">
                <Text variant="lead" tone="muted" align="center" className={styles.sectionLead}>
                  Exemplos ao vivo, código para copiar e a API completa de cada um.
                </Text>
              </Stack>
            </Stack>
            <Stack direction="row" gap="sm" justify="center" wrap>
              <Button type="button" size="lg" onClick={() => router.push("/components")}>
                Abrir a documentação
                <Icon icon={ArrowRight} size="sm" />
              </Button>
              <Button type="button" size="lg" variant="outline" onClick={() => router.push("/playground")}>
                Ver telas prontas
              </Button>
            </Stack>
          </Stack>
        </div>
      </section>

      <Separator />
      <footer className={styles.container}>
        <Stack direction="row" justify="between" align="center" padding="lg" gap="md" wrap>
          <Stack direction="row" align="center" gap="sm">
            <Logo size={20} />
            <Text variant="small" tone="muted">
              © 2026 PHSA TEC · Design System
            </Text>
          </Stack>
          <Stack direction="row" gap="lg">
            <NavLink href="/components" className={styles.topLink}>
              Componentes
            </NavLink>
            <NavLink href="/playground" className={styles.topLink}>
              Playground
            </NavLink>
            <NavLink href={REPOSITORY} className={styles.topLink}>
              GitHub
            </NavLink>
          </Stack>
        </Stack>
      </footer>
    </main>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <Stack maxWidth="xs" gap="sm">
      <Input
        type="email"
        label="E-mail"
        placeholder="voce@exemplo.com"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
      />
      <Button
        block
        onClick={() =>
          toast.success("Inscrição feita", {
            description: email || "Demonstração",
          })
        }
      >
        Assinar
      </Button>
    </Stack>
  );
}

function SignupCard() {
  return (
    <Card heading="Criar conta" description="Validação nativa do navegador.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Conta criada", {
            description: "Demonstração: nada foi enviado.",
          });
        }}
      >
        <Stack gap="md">
          <Input name="email" type="email" label="E-mail" placeholder="voce@exemplo.com" required />
          <PatternInput name="telefone" label="Telefone" format="(##) #####-####" placeholder="(00) 00000-0000" />
          <Checkbox name="termos" label="Aceito os termos" required />
          <Button type="submit" block>
            Criar conta
          </Button>
        </Stack>
      </form>
    </Card>
  );
}

function TeamCard() {
  return (
    <Card heading="Equipe" description="Projeto Atlas">
      <Stack gap="md">
        <Stack direction="row" align="center" justify="between">
          <AvatarGroup>
            <Avatar name="Ana Costa" />
            <Avatar name="Bruno Lima" />
            <Avatar name="Carla Souza" />
            <Avatar name="Diego Alves" />
          </AvatarGroup>
          <Badge variant="success">Em dia</Badge>
        </Stack>
        <Stack gap="xs">
          <Stack direction="row" justify="between">
            <Text variant="small" tone="muted" as="span">
              Sprint 14
            </Text>
            <Text variant="small" weight="medium" as="span">
              72%
            </Text>
          </Stack>
          <Progress value={72} label="Progresso da sprint" />
        </Stack>
        <Stack direction="row" gap="xs" wrap>
          <Badge>Design</Badge>
          <Badge variant="secondary">Front-end</Badge>
          <Badge variant="outline">API</Badge>
        </Stack>
        <Button type="button" variant="outline" block onClick={() => toast("Convite enviado (demo)")}>
          Convidar pessoa
        </Button>
      </Stack>
    </Card>
  );
}

function NotificationsCard() {
  return (
    <Card heading="Notificações" description="Escolha o que quer receber.">
      <Stack gap="md">
        <Switch label="Comentários" description="Quando alguém responder você." checked />
        <Switch label="Menções" description="Quando alguém citar você." />
        <Separator />
        <Alert
          variant="info"
          heading="Resumo semanal"
          description="Toda segunda às 9h, com o que mudou nos seus projetos."
        />
      </Stack>
    </Card>
  );
}

/** Rótulo em mono, título e texto de apoio: o mesmo cabeçalho em todas as seções da landing. */
function SectionIntro({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  lead: string;
  align?: "center" | "start";
}) {
  return (
    <Stack gap="sm" align={align}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <Text variant="h2" align={align} className={styles.sectionTitle}>
        {title}
      </Text>
      <Stack maxWidth={align === "center" ? "2xl" : "none"}>
        <Text variant="lead" tone="muted" align={align} className={styles.sectionLead}>
          {lead}
        </Text>
      </Stack>
    </Stack>
  );
}
