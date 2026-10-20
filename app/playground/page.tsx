"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Alert,
  AlertDialog,
  Badge,
  Button,
  Card,
  Cell,
  Checkbox,
  Column,
  Combobox,
  Command,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  DatePicker,
  Dialog,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  Grid,
  Icon,
  Input,
  NumericInput,
  PatternInput,
  Popover,
  Radio,
  RadioGroup,
  Row,
  Select,
  Separator,
  Stack,
  Switch,
  Tab,
  TabPanel,
  Table,
  Tabs,
  Text,
  Textarea,
  Toaster,
  Tooltip,
} from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";
import { Bell } from "@phsa.tec/design-system-react/icons/bell";
import { CircleCheck } from "@phsa.tec/design-system-react/icons/circle-check";
import { Heart } from "@phsa.tec/design-system-react/icons/heart";
import { Settings } from "@phsa.tec/design-system-react/icons/settings";
import { TriangleAlert } from "@phsa.tec/design-system-react/icons/triangle-alert";

type Member = { id: number; name: string; role: string; status: "ativo" | "convidado" | "suspenso" };

const STATUS_BADGE = { ativo: "success", convidado: "secondary", suspenso: "destructive" } as const;

const INITIAL_TEAM: Member[] = [
  { id: 1, name: "Ana Costa", role: "Editora", status: "ativo" },
  { id: 2, name: "Bruno Lima", role: "Leitor", status: "convidado" },
  { id: 3, name: "Carla Souza", role: "Admin", status: "ativo" },
  { id: 4, name: "Diego Alves", role: "Leitor", status: "suspenso" },
];

const valueOf = (e: Event) => (e.target as HTMLInputElement).value;
const detailOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;

export default function Home() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [tab, setTab] = useState("cadastro");

  // Cadastro: campos controlados só onde a página precisa reagir; o resto vem do FormData.
  const [name, setName] = useState("");
  const [nameErrors, setNameErrors] = useState<string[]>([]);
  const [plan, setPlan] = useState("basico");
  const [submitted, setSubmitted] = useState<Record<string, FormDataEntryValue | FormDataEntryValue[]> | null>(null);

  // Equipe
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [editing, setEditing] = useState<Member | null>(null);
  const [editName, setEditName] = useState("");
  const [removing, setRemoving] = useState<Member | null>(null);

  const toggleTheme = (on: boolean) => {
    setDark(on);
    document.documentElement.classList.toggle("dark", on);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validação "de servidor": erros vindos de fora do componente, via prop `errors`.
    const errors: string[] = [];
    if (name.trim().split(/\s+/).length < 2) errors.push("Informe nome e sobrenome.");
    if (/\d/.test(name)) errors.push("O nome não pode ter números.");
    setNameErrors(errors);
    if (errors.length) {
      toast.error("Corrija os erros do formulário");
      return;
    }
    const data = new FormData(e.currentTarget);
    const entries: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
    for (const key of new Set(data.keys())) {
      const all = data.getAll(key);
      entries[key] = all.length > 1 ? all : all[0];
    }
    setSubmitted(entries);
    toast.success("Cadastro enviado", { description: "Veja o FormData abaixo do formulário." });
  };

  const handleReset = () => {
    setName("");
    setNameErrors([]);
    setPlan("basico");
    setSubmitted(null);
  };

  const handleMemberAction = (member: Member, action: string) => {
    if (action === "edit") {
      setEditing(member);
      setEditName(member.name);
    } else if (action === "toggle") {
      setTeam((list) =>
        list.map((m) => (m.id === member.id ? { ...m, status: m.status === "suspenso" ? "ativo" : "suspenso" } : m)),
      );
    } else if (action === "delete") {
      setRemoving(member);
    }
  };

  const saveEdit = () => {
    if (!editing) return;
    setTeam((list) => list.map((m) => (m.id === editing.id ? { ...m, name: editName } : m)));
    toast("Membro atualizado", { description: editName });
    setEditing(null);
  };

  const confirmRemove = () => {
    if (!removing) return;
    const removed = removing;
    setTeam((list) => list.filter((m) => m.id !== removed.id));
    setRemoving(null);
    toast("Membro removido", {
      description: removed.name,
      action: { label: "Desfazer", onClick: () => setTeam((list) => [...list, removed].sort((a, b) => a.id - b.id)) },
    });
  };

  return (
    <Stack as="main" background="muted" minHeight="screen" padding="lg">
      <Stack maxWidth="6xl" gap="lg">
        <Stack as="header" direction="row" align="center" justify="between" gap="md" wrap>
          <Stack direction="row" align="center" gap="sm" wrap>
            <Text variant="h2" as="h1">
              PHSA Design System
            </Text>
            <Badge variant="outline">1.1.0</Badge>
            <Badge variant="secondary">sem CSS</Badge>
          </Stack>
          <Switch label="Tema escuro" checked={dark} onChange={(e) => toggleTheme((e.target as HTMLInputElement).checked)} />
        </Stack>

        <Alert
          variant="info"
          heading="CSS hostil ativo"
          description='O globals.css deste app define button { background: hotpink; font-family: "Comic Sans MS" }. Os componentes não podem ser afetados.'
          dismissible
        />

        <Tabs value={tab} onPhsaChange={(e) => setTab(detailOf(e))}>
          <Tab slot="tab" value="cadastro">Cadastro</Tab>
          <Tab slot="tab" value="equipe">Equipe</Tab>
          <Tab slot="tab" value="extras">Overlays</Tab>

          {/* ---------------- Cadastro ---------------- */}
          <TabPanel value="cadastro">
            <Stack gap="lg">
              <Card heading="Formulário de cadastro" description="Form nativo: FormData, required, reset e validação do navegador.">
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <Stack gap="md">
                    <Grid minItemWidth="16rem">
                      <Input
                        name="nome"
                        label="Nome completo"
                        placeholder="Maria da Silva"
                        required
                        value={name}
                        errors={nameErrors}
                        onInput={(e) => setName(valueOf(e))}
                      />
                      <Input name="email" type="email" label="E-mail" placeholder="voce@exemplo.com" required />
                      <PatternInput name="cpf" label="CPF" description="Só números no envio." format="###.###.###-##" placeholder="000.000.000-00" required />
                      <PatternInput name="telefone" label="Telefone" format="(##) #####-####" placeholder="(00) 00000-0000" />
                      <DatePicker name="nascimento" label="Data de nascimento" max="2026-10-18" />
                      <DatePicker name="ferias" label="Férias" mode="range" description="Selecione início e fim." />
                    </Grid>

                    <Separator />

                    <Grid minItemWidth="16rem">
                      <Select name="uf" label="Estado" placeholder="Selecione" searchable required>
                        <optgroup label="Sudeste">
                          <option value="sp">São Paulo</option>
                          <option value="rj">Rio de Janeiro</option>
                          <option value="mg">Minas Gerais</option>
                          <option value="es">Espírito Santo</option>
                        </optgroup>
                        <optgroup label="Sul">
                          <option value="pr">Paraná</option>
                          <option value="sc">Santa Catarina</option>
                          <option value="rs">Rio Grande do Sul</option>
                        </optgroup>
                      </Select>
                      <Combobox name="cidade" label="Cidade" placeholder="Digite para buscar">
                        <option value="sao-paulo">São Paulo</option>
                        <option value="campinas">Campinas</option>
                        <option value="rio">Rio de Janeiro</option>
                        <option value="bh">Belo Horizonte</option>
                        <option value="curitiba">Curitiba</option>
                        <option value="poa">Porto Alegre</option>
                      </Combobox>
                      <Select name="interesses" label="Interesses" placeholder="Um ou mais" multiple>
                        <option value="design">Design</option>
                        <option value="frontend">Front-end</option>
                        <option value="backend">Back-end</option>
                        <option value="dados">Dados</option>
                      </Select>
                      <NumericInput name="renda" label="Renda mensal" prefix="R$ " decimalScale={2} min="0" placeholder="0,00" />
                    </Grid>

                    <RadioGroup name="plano" label="Plano" orientation="horizontal" value={plan} onChange={(e) => setPlan(valueOf(e))}>
                      <Radio value="basico">Básico</Radio>
                      <Radio value="pro">Pro</Radio>
                      <Radio value="empresa">Empresa</Radio>
                    </RadioGroup>

                    {plan === "empresa" && (
                      <Alert variant="warning" heading="Plano Empresa" description="Um consultor vai entrar em contato em até 2 dias úteis." />
                    )}

                    <Textarea name="sobre" label="Sobre você" placeholder="Conte um pouco…" rows={3} maxLength={280} />

                    <Stack gap="md">
                      <Checkbox name="termos" label="Aceito os termos de uso" required />
                      <Switch name="newsletter" label="Quero receber a newsletter" description="No máximo um e-mail por semana." />
                    </Stack>

                    <Stack direction="row" justify="end" gap="sm">
                      <Button type="reset" variant="outline">
                        Limpar
                      </Button>
                      <Button type="submit">Cadastrar</Button>
                    </Stack>
                  </Stack>
                </form>
              </Card>

              {submitted && (
                <Card heading="FormData enviado">
                  <Stack gap="xs">
                    {Object.entries(submitted).map(([key, value]) => (
                      <Stack key={key} direction="row" justify="between" gap="md">
                        <Text weight="medium" as="span">
                          {key}
                        </Text>
                        <Text tone="muted" as="span">
                          {Array.isArray(value) ? value.join(", ") : String(value)}
                        </Text>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              )}
            </Stack>
          </TabPanel>

          {/* ---------------- Equipe ---------------- */}
          <TabPanel value="equipe">
            {mounted && <Table caption={`Equipe (${team.length})`}>
              <Column label="Nome" sortable />
              <Column label="Papel" sortable />
              <Column label="Status" />
              <Column label="" />
              {team.map((member) => (
                <Row key={member.id}>
                  <Cell>{member.name}</Cell>
                  <Cell>{member.role}</Cell>
                  <Cell>
                    <Badge variant={STATUS_BADGE[member.status]}>{member.status}</Badge>
                  </Cell>
                  <Cell>
                    <DropdownMenu align="end" onPhsaSelect={(e) => handleMemberAction(member, detailOf(e))}>
                      <Button slot="trigger" type="button" variant="ghost" size="sm">
                        Ações
                      </Button>
                      <DropdownItem value="edit">Editar</DropdownItem>
                      <DropdownItem value="toggle">{member.status === "suspenso" ? "Reativar" : "Suspender"}</DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem value="delete" variant="destructive">
                        Remover
                      </DropdownItem>
                    </DropdownMenu>
                  </Cell>
                </Row>
              ))}
            </Table>}

            <Dialog
              open={editing !== null}
              heading="Editar membro"
              description="A alteração vale só para esta sessão."
              onClose={() => setEditing(null)}
            >
              <Input label="Nome" value={editName} onInput={(e) => setEditName(valueOf(e))} />
              <Button slot="footer" type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
              <Button slot="footer" type="button" onClick={saveEdit}>
                Salvar
              </Button>
            </Dialog>

            <AlertDialog
              open={removing !== null}
              variant="destructive"
              heading={`Remover ${removing?.name ?? ""}?`}
              description="O membro perde o acesso imediatamente."
              confirmLabel="Remover"
              cancelLabel="Cancelar"
              onPhsaConfirm={confirmRemove}
              onClose={() => setRemoving(null)}
            />
          </TabPanel>

          {/* ---------------- Overlays ---------------- */}
          <TabPanel value="extras">
            <Grid minItemWidth="16rem">
              <Card heading="Botões e tooltips" description="Variantes com tooltip em cada uma.">
                <Stack direction="row" gap="sm" wrap>
                  {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
                    <Tooltip key={variant} text={`variant="${variant}"`}>
                      <Button slot="trigger" type="button" variant={variant} onClick={() => toast(`Clicou em ${variant}`)}>
                        {variant}
                      </Button>
                    </Tooltip>
                  ))}
                </Stack>
              </Card>

              <Card heading="Toasts" description="Disparados pela função toast().">
                <Stack direction="row" gap="sm" wrap>
                  <Button type="button" variant="outline" onClick={() => toast.success("Salvo!")}>
                    Sucesso
                  </Button>
                  <Button type="button" variant="outline" onClick={() => toast.warning("Cuidado", { description: "Isso é um aviso." })}>
                    Aviso
                  </Button>
                  <Button type="button" variant="outline" onClick={() => toast.error("Falhou", { description: "Tente de novo." })}>
                    Erro
                  </Button>
                </Stack>
              </Card>

              <Card heading="Ícones" description="Lucide, um import por ícone.">
                <Stack gap="md">
                  <Stack direction="row" align="center" gap="md">
                    <Icon icon={Heart} size="xs" />
                    <Icon icon={Heart} size="sm" />
                    <Icon icon={Heart} size="md" />
                    <Icon icon={Heart} size="lg" />
                    <Icon icon={Heart} size="xl" />
                  </Stack>
                  <Stack direction="row" align="center" gap="md">
                    <Icon icon={CircleCheck} size="lg" tone="success" label="Sucesso" />
                    <Icon icon={TriangleAlert} size="lg" tone="warning" label="Aviso" />
                    <Icon icon={Bell} size="lg" tone="primary" />
                    <Icon icon={Settings} size="lg" tone="muted" strokeWidth={1.5} />
                  </Stack>
                  <Button type="button" variant="outline" onClick={() => toast("Configurações")}>
                    <Icon icon={Settings} />
                    Configurações
                  </Button>
                </Stack>
              </Card>

              <Card heading="Popover">
                <Popover>
                  <Button slot="trigger" type="button" variant="outline">
                    Abrir popover
                  </Button>
                  <Stack gap="md">
                    <Text variant="h4" as="span">
                      Dimensões
                    </Text>
                    <Input label="Largura" size="sm" value="100%" />
                    <Input label="Altura" size="sm" value="25px" />
                  </Stack>
                </Popover>
              </Card>

              <Card heading="Command" description="Busca com teclado.">
                {mounted && <Command placeholder="Buscar comando…" onPhsaSelect={(e) => toast(`Comando: ${detailOf(e)}`)}>
                  <CommandGroup label="Sugestões">
                    <CommandItem value="calendario">Calendário</CommandItem>
                    <CommandItem value="busca">Buscar emoji</CommandItem>
                    <CommandItem value="calculadora">Calculadora</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup label="Configurações">
                    <CommandItem value="perfil">Perfil</CommandItem>
                    <CommandItem value="cobranca" disabled>
                      Cobrança
                    </CommandItem>
                  </CommandGroup>
                </Command>}
              </Card>
            </Grid>
          </TabPanel>
        </Tabs>
      </Stack>

      <Toaster position="bottom-right" />
    </Stack>
  );
}
