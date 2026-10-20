"use client";

import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import {
  AlertDialog,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  FileUpload,
  Icon,
  Input,
  PatternInput,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Slider,
  Stack,
  Switch,
  Tab,
  TabPanel,
  Tabs,
  Text,
  Textarea,
  Toggle,
  ToggleGroup,
} from "@phsa.tec/design-system-react/react";
import type { PhsaFileUpload } from "@phsa.tec/design-system-react/file-upload";
import { toast } from "@phsa.tec/design-system-react/toast";
import { Bell } from "@phsa.tec/design-system-react/icons/bell";
import { Link as LinkIcon } from "@phsa.tec/design-system-react/icons/link";
import { Lock } from "@phsa.tec/design-system-react/icons/lock";
import { Monitor } from "@phsa.tec/design-system-react/icons/monitor";
import { Moon } from "@phsa.tec/design-system-react/icons/moon";
import { Palette } from "@phsa.tec/design-system-react/icons/palette";
import { Plus } from "@phsa.tec/design-system-react/icons/plus";
import { Sun } from "@phsa.tec/design-system-react/icons/sun";
import { Trash } from "@phsa.tec/design-system-react/icons/trash";
import { TriangleAlert } from "@phsa.tec/design-system-react/icons/triangle-alert";
import { User } from "@phsa.tec/design-system-react/icons/user";

// ---------------------------------------------------------------- helpers

const valueOf = (e: Event) => (e.target as HTMLInputElement).value;
const checkedOf = (e: Event) => (e.target as HTMLInputElement).checked;
const detailOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const EMAIL = /^\S+@\S+\.\S+$/;
const USERNAME = /^[a-z0-9_.]{3,20}$/;
const BIO_LIMIT = 160;
const MAX_URLS = 5;
const MAX_PHOTO = 2 * 1024 * 1024;

// Abaixo do `md` o menu vertical vira abas horizontais em cima do conteúdo.
const MOBILE = "(max-width: 767px)";
const subscribeMobile = (onChange: () => void) => {
  const query = matchMedia(MOBILE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isMobile = () => matchMedia(MOBILE).matches;

// Tema: mesma fonte da verdade do site/theme-toggle.tsx (classes no <html> + localStorage "theme").
type Theme = "light" | "dark" | "system";
const THEME_EVENT = "phsa-theme";
const subscribeTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["class"] });
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
};
const readTheme = (): Theme => {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "dark" || stored === "light" ? stored : "system";
  } catch {
    return "system";
  }
};
const applyTheme = (theme: Theme) => {
  const dark = theme === "dark" || (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.classList.toggle("navy", dark);
  try {
    if (theme === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", theme);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
};

// ---------------------------------------------------------------- dados fictícios

type Url = { id: number; value: string };
type Profile = {
  photo: string;
  name: string;
  username: string;
  bio: string;
  phone: string;
  language: string;
  urls: Url[];
};

const INITIAL_PROFILE: Profile = {
  photo: "",
  name: "Camila Ribeiro",
  username: "camila.ribeiro",
  bio: "Designer de produto em São Paulo. Escrevo sobre sistemas de design e acessibilidade.",
  phone: "11987654321",
  language: "pt-BR",
  urls: [
    { id: 1, value: "https://exemplo.com.br/camila" },
    { id: 2, value: "https://github.com/exemplo" },
  ],
};

type Account = { email: string; birth: string };
const INITIAL_ACCOUNT: Account = { email: "camila@phsa.dev", birth: "1994-06-12" };

type Notifications = {
  notify: string;
  communication: boolean;
  marketing: boolean;
  social: boolean;
  mobile: boolean;
};
const INITIAL_NOTIFICATIONS: Notifications = {
  notify: "mencoes",
  communication: true,
  marketing: false,
  social: true,
  mobile: false,
};

type Appearance = { font: string; density: string };
const INITIAL_APPEARANCE: Appearance = { font: "inter", density: "2" };
const DENSITY_LABEL: Record<string, string> = { "1": "Compacta", "2": "Padrão", "3": "Confortável" };

const TODAY = "2026-10-20";

// ---------------------------------------------------------------- blocos de layout

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Text variant="h3" as="h2">
          {title}
        </Text>
        <Text tone="muted">{description}</Text>
      </Stack>
      <Separator />
    </Stack>
  );
}

function FormFooter({
  dirty,
  saving,
  onDiscard,
  hint,
}: {
  dirty: boolean;
  saving: boolean;
  onDiscard: () => void;
  hint?: ReactNode;
}) {
  return (
    <Stack direction="row" align="center" justify="between" gap="sm" wrap>
      <Text variant="small" tone="muted" as="span">
        {hint ?? (dirty ? "Você tem alterações não salvas." : "Tudo salvo.")}
      </Text>
      <Stack direction="row" gap="sm">
        <Button type="button" variant="ghost" disabled={!dirty || saving} onClick={onDiscard}>
          Descartar
        </Button>
        <Button type="submit" disabled={!dirty} loading={saving} loadingLabel="Salvando">
          {saving ? "Salvando…" : "Salvar"}
        </Button>
      </Stack>
    </Stack>
  );
}

// ---------------------------------------------------------------- página

export default function SettingsPage() {
  const mobile = useSyncExternalStore(subscribeMobile, isMobile, () => false);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, (): Theme => "system");
  const [section, setSection] = useState("perfil");
  const [saving, setSaving] = useState<string | null>(null);

  const save = async (key: string, message: string, commit: () => void) => {
    setSaving(key);
    await wait(800);
    setSaving(null);
    commit();
    toast.success(message);
  };

  // ---------------- Perfil
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [savedProfile, setSavedProfile] = useState(INITIAL_PROFILE);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [photoError, setPhotoError] = useState("");
  const [nextUrlId, setNextUrlId] = useState(3);
  const profileDirty = !same(profile, savedProfile);

  const updateProfile = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile((p) => ({ ...p, [key]: value }));
    setProfileErrors((errors) => ({ ...errors, [key]: "" }));
  };

  const handlePhoto = (e: Event) => {
    const file = (e.target as PhsaFileUpload).files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setPhotoError("Escolha uma imagem (PNG, JPG ou WebP).");
    if (file.size > MAX_PHOTO) return setPhotoError("A imagem precisa ter no máximo 2 MB.");
    setPhotoError("");
    updateProfile("photo", URL.createObjectURL(file));
  };

  const updateUrl = (id: number, value: string) => {
    setProfile((p) => ({ ...p, urls: p.urls.map((u) => (u.id === id ? { ...u, value } : u)) }));
    setProfileErrors((errors) => ({ ...errors, [`url-${id}`]: "" }));
  };
  const addUrl = () => {
    setProfile((p) => ({ ...p, urls: [...p.urls, { id: nextUrlId, value: "" }] }));
    setNextUrlId((n) => n + 1);
  };
  const removeUrl = (id: number) => setProfile((p) => ({ ...p, urls: p.urls.filter((u) => u.id !== id) }));

  const submitProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (profile.name.trim().split(/\s+/).length < 2) errors.name = "Informe nome e sobrenome.";
    if (!USERNAME.test(profile.username))
      errors.username = "Use de 3 a 20 caracteres: letras minúsculas, números, ponto ou _.";
    if (profile.phone && profile.phone.length < 10) errors.phone = "Telefone incompleto.";
    for (const url of profile.urls) {
      if (!/^https?:\/\/\S+\.\S+$/.test(url.value)) errors[`url-${url.id}`] = "Informe uma URL começando com https://";
    }
    setProfileErrors(errors);
    if (Object.keys(errors).length) {
      toast.error("Revise os campos destacados");
      return;
    }
    save("perfil", "Perfil atualizado", () => setSavedProfile(profile));
  };

  // ---------------- Conta
  const [account, setAccount] = useState(INITIAL_ACCOUNT);
  const [savedAccount, setSavedAccount] = useState(INITIAL_ACCOUNT);
  const [password, setPassword] = useState({ current: "", next: "", confirm: "" });
  const [accountErrors, setAccountErrors] = useState<Record<string, string[]>>({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const passwordTouched = Object.values(password).some(Boolean);
  const accountDirty = !same(account, savedAccount) || passwordTouched;

  const updatePassword = (key: keyof typeof password, value: string) => {
    setPassword((p) => ({ ...p, [key]: value }));
    setAccountErrors((errors) => ({ ...errors, [key]: [] }));
  };

  const submitAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: Record<string, string[]> = {};
    if (!EMAIL.test(account.email)) errors.email = ["Informe um e-mail válido."];
    if (passwordTouched) {
      if (!password.current) errors.current = ["Informe a senha atual."];
      const rules: string[] = [];
      if (password.next.length < 8) rules.push("Use pelo menos 8 caracteres.");
      if (!/\d/.test(password.next)) rules.push("Inclua pelo menos um número.");
      if (!/[A-Z]/.test(password.next)) rules.push("Inclua pelo menos uma letra maiúscula.");
      if (password.next && password.next === password.current) rules.push("A nova senha precisa ser diferente da atual.");
      if (rules.length) errors.next = rules;
      if (password.confirm !== password.next) errors.confirm = ["As senhas não conferem."];
    }
    setAccountErrors(errors);
    if (Object.values(errors).some((list) => list.length)) {
      toast.error("Revise os campos destacados");
      return;
    }
    const changedPassword = passwordTouched;
    save("conta", changedPassword ? "Conta e senha atualizadas" : "Conta atualizada", () => {
      setSavedAccount(account);
      setPassword({ current: "", next: "", confirm: "" });
    });
  };

  // ---------------- Notificações
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [savedNotifications, setSavedNotifications] = useState(INITIAL_NOTIFICATIONS);
  const notificationsDirty = !same(notifications, savedNotifications);
  const updateNotifications = <K extends keyof Notifications>(key: K, value: Notifications[K]) =>
    setNotifications((n) => ({ ...n, [key]: value }));

  const submitNotifications = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save("notificacoes", "Preferências de notificação salvas", () => setSavedNotifications(notifications));
  };

  // ---------------- Aparência
  const [appearance, setAppearance] = useState(INITIAL_APPEARANCE);
  const [savedAppearance, setSavedAppearance] = useState(INITIAL_APPEARANCE);
  const appearanceDirty = !same(appearance, savedAppearance);

  const submitAppearance = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    save("aparencia", "Aparência atualizada", () => setSavedAppearance(appearance));
  };

  const tabLabel = (icon: typeof User, label: string) =>
    mobile ? (
      label
    ) : (
      <Stack direction="row" align="center" gap="sm" grow>
        <Icon icon={icon} size="sm" />
        {label}
      </Stack>
    );

  return (
    <Stack padding="lg" gap="lg">
      <Stack gap="xs">
        <Text variant="h2" as="h1">
          Configurações
        </Text>
        <Text tone="muted">Gerencie seu perfil, a segurança da conta e como o aplicativo aparece para você.</Text>
      </Stack>

      <Separator />

      <Tabs value={section} orientation={mobile ? "horizontal" : "vertical"} onPhsaChange={(e) => setSection(detailOf(e))}>
        <Tab slot="tab" value="perfil">
          {tabLabel(User, "Perfil")}
        </Tab>
        <Tab slot="tab" value="conta">
          {tabLabel(Lock, "Conta")}
        </Tab>
        <Tab slot="tab" value="notificacoes">
          {tabLabel(Bell, mobile ? "Avisos" : "Notificações")}
        </Tab>
        <Tab slot="tab" value="aparencia">
          {tabLabel(Palette, "Aparência")}
        </Tab>

        {/* ---------------- Perfil ---------------- */}
        <TabPanel value="perfil">
          <Stack gap="lg" maxWidth="2xl" padding={mobile ? "none" : "sm"}>
            <SectionHeader title="Perfil" description="É assim que as outras pessoas veem você no aplicativo." />

            <form onSubmit={submitProfile} noValidate>
              <Stack gap="lg">
                <Stack direction="row" gap="lg" align="center" wrap>
                  <Avatar size="lg" src={profile.photo || undefined} name={profile.name} alt={profile.name} />
                  <Stack gap="xs" grow>
                    <FileUpload
                      label="Foto de perfil"
                      accept="image/*"
                      buttonLabel="Trocar foto"
                      dropLabel="ou arraste uma imagem (até 2 MB)"
                      error={photoError}
                      onChange={handlePhoto}
                    />
                    {profile.photo && (
                      <Stack direction="row">
                        <Button type="button" variant="link" size="sm" onClick={() => updateProfile("photo", "")}>
                          Remover foto
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </Stack>

                <Input
                  label="Nome"
                  description="Seu nome completo, como aparece no perfil."
                  autocomplete="name"
                  value={profile.name}
                  error={profileErrors.name}
                  onInput={(e) => updateProfile("name", valueOf(e))}
                />

                <Input
                  label="Nome de usuário"
                  description="Seu endereço público: phsa.dev/@usuario. Dá para trocar a cada 30 dias."
                  prefix="@"
                  autocomplete="username"
                  value={profile.username}
                  error={profileErrors.username}
                  onInput={(e) => updateProfile("username", valueOf(e).toLowerCase())}
                />

                <Stack gap="xs">
                  <Textarea
                    label="Bio"
                    placeholder="Conte um pouco sobre você…"
                    rows={3}
                    maxLength={BIO_LIMIT}
                    value={profile.bio}
                    onInput={(e) => updateProfile("bio", (e.target as HTMLTextAreaElement).value)}
                  />
                  <Text variant="small" tone={BIO_LIMIT - profile.bio.length <= 20 ? "warning" : "muted"} align="end">
                    {profile.bio.length}/{BIO_LIMIT}
                  </Text>
                </Stack>

                <Stack direction="row" gap="md" wrap>
                  <Stack grow>
                    <PatternInput
                      label="Celular"
                      format="(##) #####-####"
                      placeholder="(00) 00000-0000"
                      value={profile.phone}
                      error={profileErrors.phone}
                      onInput={(e) => updateProfile("phone", valueOf(e))}
                    />
                  </Stack>
                  <Stack grow>
                    <Select
                      label="Idioma"
                      value={profile.language}
                      onChange={(e) => updateProfile("language", (e.target as HTMLSelectElement).value)}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="pt-PT">Português (Portugal)</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </Select>
                  </Stack>
                </Stack>

                <Stack gap="sm">
                  <Stack gap="xs">
                    <Text weight="medium" as="span">
                      Links
                    </Text>
                    <Text variant="small" tone="muted">
                      Site, portfólio ou redes sociais. Até {MAX_URLS} links.
                    </Text>
                  </Stack>
                  {profile.urls.length === 0 && (
                    <Text variant="small" tone="muted">
                      Nenhum link adicionado.
                    </Text>
                  )}
                  {profile.urls.map((url, index) => (
                    <Input
                      key={url.id}
                      aria-label={`Link ${index + 1}`}
                      type="url"
                      placeholder="https://"
                      value={url.value}
                      error={profileErrors[`url-${url.id}`]}
                      onInput={(e) => updateUrl(url.id, valueOf(e))}
                    >
                      <Icon slot="prefix" icon={LinkIcon} size="sm" />
                      <Button
                        slot="suffix"
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-label={`Remover link ${index + 1}`}
                        onClick={() => removeUrl(url.id)}
                      >
                        <Icon icon={Trash} size="sm" />
                      </Button>
                    </Input>
                  ))}
                  <Stack direction="row">
                    <Button type="button" variant="outline" size="sm" disabled={profile.urls.length >= MAX_URLS} onClick={addUrl}>
                      <Icon icon={Plus} size="sm" />
                      Adicionar link
                    </Button>
                  </Stack>
                </Stack>

                <Separator />

                <FormFooter
                  dirty={profileDirty}
                  saving={saving === "perfil"}
                  onDiscard={() => {
                    setProfile(savedProfile);
                    setProfileErrors({});
                    setPhotoError("");
                  }}
                />
              </Stack>
            </form>
          </Stack>
        </TabPanel>

        {/* ---------------- Conta ---------------- */}
        <TabPanel value="conta">
          <Stack gap="lg" maxWidth="2xl" padding={mobile ? "none" : "sm"}>
            <SectionHeader title="Conta" description="Dados de acesso e segurança. Só você vê estas informações." />

            <form onSubmit={submitAccount} noValidate>
              <Stack gap="lg">
                <Stack direction="row" gap="md" wrap>
                  <Stack grow>
                    <Input
                      label="E-mail"
                      type="email"
                      autocomplete="email"
                      description="Usado para entrar e receber avisos."
                      value={account.email}
                      errors={accountErrors.email}
                      onInput={(e) => {
                        setAccount((a) => ({ ...a, email: valueOf(e) }));
                        setAccountErrors((errors) => ({ ...errors, email: [] }));
                      }}
                    />
                  </Stack>
                  <Stack grow>
                    <DatePicker
                      label="Data de nascimento"
                      description="Não aparece no seu perfil."
                      max={TODAY}
                      value={account.birth}
                      onInput={(e) => setAccount((a) => ({ ...a, birth: valueOf(e) }))}
                    />
                  </Stack>
                </Stack>

                <Stack gap="md">
                  <Stack gap="xs">
                    <Text weight="medium" as="span">
                      Alterar senha
                    </Text>
                    <Text variant="small" tone="muted">
                      Deixe em branco para manter a senha atual.
                    </Text>
                  </Stack>
                  <Input
                    label="Senha atual"
                    type="password"
                    autocomplete="current-password"
                    value={password.current}
                    errors={accountErrors.current}
                    onInput={(e) => updatePassword("current", valueOf(e))}
                  />
                  <Stack direction="row" gap="md" wrap>
                    <Stack grow>
                      <Input
                        label="Nova senha"
                        type="password"
                        autocomplete="new-password"
                        description="Mínimo de 8 caracteres, com número e letra maiúscula."
                        value={password.next}
                        errors={accountErrors.next}
                        onInput={(e) => updatePassword("next", valueOf(e))}
                      />
                    </Stack>
                    <Stack grow>
                      <Input
                        label="Confirmar nova senha"
                        type="password"
                        autocomplete="new-password"
                        value={password.confirm}
                        errors={accountErrors.confirm}
                        onInput={(e) => updatePassword("confirm", valueOf(e))}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                <Separator />

                <FormFooter
                  dirty={accountDirty}
                  saving={saving === "conta"}
                  onDiscard={() => {
                    setAccount(savedAccount);
                    setPassword({ current: "", next: "", confirm: "" });
                    setAccountErrors({});
                  }}
                />
              </Stack>
            </form>

            <Card>
              <Stack slot="title" direction="row" align="center" gap="sm">
                <Icon icon={TriangleAlert} size="sm" tone="destructive" />
                <Text tone="destructive" weight="semibold" as="span">
                  Zona de perigo
                </Text>
              </Stack>
              <Text slot="description" tone="muted">
                Ações permanentes, que não podem ser desfeitas.
              </Text>
              <Stack direction="row" align="center" justify="between" gap="md" wrap>
                <Stack gap="xs">
                  <Text weight="medium" as="span">
                    Excluir conta
                  </Text>
                  <Text variant="small" tone="muted">
                    Apaga seu perfil, seus projetos e todo o histórico.
                  </Text>
                </Stack>
                <Button type="button" variant="destructive" onClick={() => setConfirmDelete(true)}>
                  <Icon icon={Trash} size="sm" />
                  Excluir conta
                </Button>
              </Stack>
            </Card>

            <AlertDialog
              open={confirmDelete}
              variant="destructive"
              heading="Excluir sua conta?"
              description="Seu perfil, seus projetos e todo o histórico serão apagados em definitivo. Essa ação não pode ser desfeita."
              confirmLabel="Sim, excluir conta"
              cancelLabel="Cancelar"
              onPhsaConfirm={() =>
                toast.success("Conta agendada para exclusão", {
                  description: "Enviamos um e-mail de confirmação (demo).",
                })
              }
              onClose={() => setConfirmDelete(false)}
            />
          </Stack>
        </TabPanel>

        {/* ---------------- Notificações ---------------- */}
        <TabPanel value="notificacoes">
          <Stack gap="lg" maxWidth="2xl" padding={mobile ? "none" : "sm"}>
            <SectionHeader title="Notificações" description="Escolha o que chega até você e por qual canal." />

            <form onSubmit={submitNotifications}>
              <Stack gap="lg">
                <RadioGroup
                  label="Notificar sobre…"
                  value={notifications.notify}
                  onChange={(e) => updateNotifications("notify", valueOf(e))}
                >
                  <Radio value="todas">Todas as novas mensagens</Radio>
                  <Radio value="mencoes">Mensagens diretas e menções</Radio>
                  <Radio value="nada">Nada</Radio>
                </RadioGroup>

                <Stack gap="sm">
                  <Text weight="medium" as="span">
                    Notificações por e-mail
                  </Text>
                  <Stack bordered radius="lg" padding="md">
                    <Switch
                      label="E-mails de comunicação"
                      description="Avisos sobre a atividade da sua conta."
                      checked={notifications.communication}
                      onChange={(e) => updateNotifications("communication", checkedOf(e))}
                    />
                  </Stack>
                  <Stack bordered radius="lg" padding="md">
                    <Switch
                      label="E-mails de marketing"
                      description="Novidades, produtos e ofertas."
                      checked={notifications.marketing}
                      onChange={(e) => updateNotifications("marketing", checkedOf(e))}
                    />
                  </Stack>
                  <Stack bordered radius="lg" padding="md">
                    <Switch
                      label="E-mails sociais"
                      description="Pedidos de amizade, seguidores e menções."
                      checked={notifications.social}
                      onChange={(e) => updateNotifications("social", checkedOf(e))}
                    />
                  </Stack>
                  <Stack bordered radius="lg" padding="md" direction="row" align="center" justify="between" gap="md">
                    <Switch
                      label="E-mails de segurança"
                      description="Novos acessos, troca de senha e alertas da conta."
                      checked
                      disabled
                    />
                    <Badge variant="secondary">Sempre ativo</Badge>
                  </Stack>
                </Stack>

                <Checkbox
                  label="Usar configurações diferentes no celular"
                  description="Você poderá ajustar as notificações push no app."
                  checked={notifications.mobile}
                  onChange={(e) => updateNotifications("mobile", checkedOf(e))}
                />

                <Separator />

                <FormFooter
                  dirty={notificationsDirty}
                  saving={saving === "notificacoes"}
                  onDiscard={() => setNotifications(savedNotifications)}
                />
              </Stack>
            </form>
          </Stack>
        </TabPanel>

        {/* ---------------- Aparência ---------------- */}
        <TabPanel value="aparencia">
          <Stack gap="lg" maxWidth="2xl" padding={mobile ? "none" : "sm"}>
            <SectionHeader title="Aparência" description="Personalize o tema, a fonte e o espaçamento da interface." />

            <form onSubmit={submitAppearance}>
              <Stack gap="lg">
                <Stack gap="sm">
                  <Stack gap="xs">
                    <Text weight="medium" as="span">
                      Tema
                    </Text>
                    <Text variant="small" tone="muted">
                      Aplicado na hora e lembrado neste dispositivo. “Sistema” segue a preferência do seu sistema operacional.
                    </Text>
                  </Stack>
                  <Stack direction="row">
                    <ToggleGroup
                      type="single"
                      value={theme}
                      onPhsaChange={(e) => {
                        const next = detailOf(e) as Theme | "";
                        if (next) applyTheme(next);
                      }}
                    >
                      <Toggle value="light">
                        <Icon icon={Sun} size="sm" />
                        Claro
                      </Toggle>
                      <Toggle value="dark">
                        <Icon icon={Moon} size="sm" />
                        Escuro
                      </Toggle>
                      <Toggle value="system">
                        <Icon icon={Monitor} size="sm" />
                        Sistema
                      </Toggle>
                    </ToggleGroup>
                  </Stack>
                </Stack>

                <Select
                  label="Fonte"
                  description="Usada em toda a interface."
                  value={appearance.font}
                  onChange={(e) => setAppearance((a) => ({ ...a, font: (e.target as HTMLSelectElement).value }))}
                >
                  <option value="inter">Inter</option>
                  <option value="geist">Geist</option>
                  <option value="ibm-plex">IBM Plex Sans</option>
                  <option value="sistema">Fonte do sistema</option>
                </Select>

                <Stack gap="xs">
                  <Slider
                    label="Densidade"
                    description="Quanto espaço sobra entre os elementos das listas e tabelas."
                    min={1}
                    max={3}
                    step={1}
                    value={appearance.density}
                    onInput={(e) => setAppearance((a) => ({ ...a, density: valueOf(e) }))}
                  />
                  <Stack direction="row" justify="between">
                    {Object.entries(DENSITY_LABEL).map(([value, label]) => (
                      <Text
                        key={value}
                        variant="small"
                        tone={appearance.density === value ? "default" : "muted"}
                        weight={appearance.density === value ? "medium" : "normal"}
                        as="span"
                      >
                        {label}
                      </Text>
                    ))}
                  </Stack>
                </Stack>

                <Separator />

                <FormFooter
                  dirty={appearanceDirty}
                  saving={saving === "aparencia"}
                  onDiscard={() => setAppearance(savedAppearance)}
                />
              </Stack>
            </form>
          </Stack>
        </TabPanel>
      </Tabs>
    </Stack>
  );
}
