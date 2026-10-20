"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Grid,
  Icon,
  Input,
  Link,
  Separator,
  Stack,
  Text,
  Toaster,
} from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";
import { Lock } from "@phsa.tec/design-system-react/icons/lock";
import { Mail } from "@phsa.tec/design-system-react/icons/mail";

// Credenciais de demonstração: qualquer outra combinação falha.
const DEMO = { email: "demo@phsa.dev", password: "123456" };
const EMAIL = /^\S+@\S+\.\S+$/;

const valueOf = (e: Event) => (e.target as HTMLInputElement).value;

// O Lucide não tem ícones de marca: estes vão no mesmo formato e funcionam no `Icon`.
// Preenchidos, então cada forma desliga o traço que o `Icon` aplica.
type IconNode = [tag: string, attrs: Record<string, string>][];

const Google: IconNode = [
  ["path", { fill: "#4285F4", stroke: "none", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }],
  ["path", { fill: "#34A853", stroke: "none", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }],
  ["path", { fill: "#FBBC05", stroke: "none", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }],
  ["path", { fill: "#EA4335", stroke: "none", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" }],
];

// Simple Icons (CC0).
const GitHub: IconNode = [
  ["path", { fill: "currentColor", stroke: "none", d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" }],
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = String(data.get("password") ?? "");

    setEmailError(EMAIL.test(email) ? "" : "Informe um e-mail válido.");
    setPasswordError(password.length >= 6 ? "" : "A senha precisa de pelo menos 6 caracteres.");
    if (!EMAIL.test(email) || password.length < 6) return;

    setFailed(false);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);

    if (email === DEMO.email && password === DEMO.password) {
      toast.success("Bem-vindo de volta!", {
        description: data.get("lembrar") ? "Vamos lembrar de você neste dispositivo." : undefined,
      });
    } else {
      setFailed(true);
    }
  };

  return (
    <Grid as="main" columns={2} stackBelow="md" minHeight="screen" gap="none">
      <Stack as="aside" background="primary" padding="2xl" justify="between" hideBelow="md">
        <Stack direction="row" align="center" gap="sm">
          <Avatar name="PHSA" size="sm" shape="square" />
          <Text variant="h4" as="span">
            PHSA
          </Text>
        </Stack>
        <Stack gap="sm">
          <Text variant="lead" as="blockquote">
            “Componentes isolados, consistentes e prontos para qualquer framework.”
          </Text>
          <Text variant="small">— Time de Design System</Text>
        </Stack>
        <Text variant="small">© 2026 PHSA</Text>
      </Stack>

      <Stack as="section" background="muted" padding="xl" align="center" justify="center">
        <Stack maxWidth="sm" gap="md">
          <Card heading="Entrar" description="Acesse sua conta para continuar.">
            <Stack gap="lg">
              {failed && (
                <Alert
                  variant="destructive"
                  heading="Não foi possível entrar"
                  description="E-mail ou senha incorretos. Tente novamente."
                  dismissible
                  onDismiss={() => setFailed(false)}
                />
              )}

              <form onSubmit={handleSubmit} noValidate>
                <Stack gap="md">
                  <Input
                    name="email"
                    type="email"
                    label="E-mail"
                    placeholder="voce@exemplo.com"
                    autocomplete="email"
                    value={email}
                    error={emailError}
                    clearable
                    onInput={(e) => {
                      setEmail(valueOf(e));
                      setEmailError("");
                    }}
                  >
                    <Icon slot="prefix" icon={Mail} />
                  </Input>

                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Senha"
                    placeholder="••••••"
                    autocomplete="current-password"
                    error={passwordError}
                    onInput={() => setPasswordError("")}
                  >
                    <Icon slot="prefix" icon={Lock} />
                    <Button slot="suffix" type="button" variant="ghost" size="sm" onClick={() => setShowPassword((v) => !v)}>
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </Button>
                  </Input>

                  <Stack direction="row" align="center" justify="between">
                    <Checkbox name="lembrar" label="Lembrar de mim" />
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast("Link de recuperação enviado (demo).");
                      }}
                    >
                      Esqueci a senha
                    </Link>
                  </Stack>

                  <Button type="submit" size="lg" block loading={loading} loadingLabel="Entrando">
                    {loading ? "Entrando…" : "Entrar"}
                  </Button>
                </Stack>
              </form>

              <Separator label="ou continue com" />

              <Grid columns={2} gap="sm">
                <Button type="button" variant="outline" block onClick={() => toast("Login com Google (demo)")}>
                  <Icon icon={Google} />
                  Google
                </Button>
                <Button type="button" variant="outline" block onClick={() => toast("Login com GitHub (demo)")}>
                  <Icon icon={GitHub} />
                  GitHub
                </Button>
              </Grid>

              <Stack direction="row" gap="xs" justify="center" align="baseline">
                <Text tone="muted" as="span">
                  Não tem conta?
                </Text>
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                >
                  Criar conta
                </Link>
              </Stack>
            </Stack>
          </Card>

          <Text variant="small" tone="muted" align="center">
            Demo: {DEMO.email} / {DEMO.password}
          </Text>
        </Stack>
      </Stack>

      <Toaster />
    </Grid>
  );
}
