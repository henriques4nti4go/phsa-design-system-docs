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
                Componentes que funcionam em qualquer lugar.
              </Text>
              <Text variant="lead" tone="muted" align="center">
                Web Components acessíveis e com tema, construídos com Lit e Tailwind CSS v4. Isolados de verdade: o CSS
                do seu app não quebra nada, e você não configura nada.
              </Text>
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
              <TeamCard />
              <NotificationsCard />
            </Grid>
          </Stack>
        </div>
      </section>

      {/* Diferenciais */}
      <section className={`${styles.container} ${styles.section}`}>
        <Stack gap="xl">
          <Stack gap="sm" align="center">
            <Text variant="h2" align="center" className={styles.sectionTitle}>
              Feito para não dar trabalho
            </Text>
            <Text variant="lead" tone="muted" align="center">
              Bibliotecas em cima de frameworks de CSS costumam vazar para os dois lados. Esta faz o contrário.
            </Text>
          </Stack>
          <Grid columns={3} stackBelow="md" gap="xl">
            {FEATURES.map((feature) => (
              <Stack key={feature.title} gap="sm">
                <span className={styles.featureIcon}>
                  <Icon icon={feature.icon} size="md" />
                </span>
                <Text variant="h4" as="h3">
                  {feature.title}
                </Text>
                <Text tone="muted">{feature.text}</Text>
              </Stack>
            ))}
          </Grid>
        </Stack>
      </section>

      {/* Código e resultado lado a lado */}
      <section className={`${styles.container} ${styles.section}`}>
        <Stack gap="xl">
          <Stack gap="sm" align="center">
            <Text variant="h2" align="center" className={styles.sectionTitle}>
              Escreva assim. Veja assim.
            </Text>
            <Text variant="lead" tone="muted" align="center">
              Componentes React tipados, com props e eventos como você espera.
            </Text>
          </Stack>
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

      {/* Chamada final */}
      <section className={`${styles.container} ${styles.section}`}>
        <Stack gap="md" align="center">
          <Text variant="h2" align="center" className={styles.sectionTitle}>
            Explore os {componentCount} componentes
          </Text>
          <Text variant="lead" tone="muted" align="center">
            Exemplos ao vivo, código para copiar e a API completa de cada um.
          </Text>
          <Button type="button" size="lg" onClick={() => router.push("/components")}>
            Abrir a documentação
            <Icon icon={ArrowRight} size="sm" />
          </Button>
        </Stack>
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
      <Button block onClick={() => toast.success("Inscrição feita", { description: email || "Demonstração" })}>
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
          toast.success("Conta criada", { description: "Demonstração: nada foi enviado." });
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
          heading="CSS hostil nesta página"
          description="O app define button { background: hotpink } no CSS global. Nenhum botão ficou rosa."
        />
      </Stack>
    </Card>
  );
}
