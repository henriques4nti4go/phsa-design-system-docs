"use client";

import { useState, useSyncExternalStore } from "react";
import {
  AlertDialog,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Cell,
  Column,
  Combobox,
  DatePicker,
  Dialog,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  EmptyState,
  Grid,
  Icon,
  Input,
  Progress,
  Row,
  Select,
  Stack,
  Tab,
  TabPanel,
  Table,
  Tabs,
  Text,
  Textarea,
  Tooltip,
} from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";
import { ArrowRightLeft } from "@phsa.tec/design-system-react/icons/arrow-right-left";
import { CircleAlert } from "@phsa.tec/design-system-react/icons/circle-alert";
import { CircleCheck } from "@phsa.tec/design-system-react/icons/circle-check";
import { CircleDashed } from "@phsa.tec/design-system-react/icons/circle-dashed";
import { ClockAlert } from "@phsa.tec/design-system-react/icons/clock-alert";
import { Calendar } from "@phsa.tec/design-system-react/icons/calendar";
import { Copy } from "@phsa.tec/design-system-react/icons/copy";
import { Ellipsis } from "@phsa.tec/design-system-react/icons/ellipsis";
import { Eye } from "@phsa.tec/design-system-react/icons/eye";
import { FunnelX } from "@phsa.tec/design-system-react/icons/funnel-x";
import { List } from "@phsa.tec/design-system-react/icons/list";
import { ListTodo } from "@phsa.tec/design-system-react/icons/list-todo";
import { Pencil } from "@phsa.tec/design-system-react/icons/pencil";
import { Plus } from "@phsa.tec/design-system-react/icons/plus";
import { Search } from "@phsa.tec/design-system-react/icons/search";
import { SearchX } from "@phsa.tec/design-system-react/icons/search-x";
import { SignalHigh } from "@phsa.tec/design-system-react/icons/signal-high";
import { SignalLow } from "@phsa.tec/design-system-react/icons/signal-low";
import { SignalMedium } from "@phsa.tec/design-system-react/icons/signal-medium";
import { SquareKanban } from "@phsa.tec/design-system-react/icons/square-kanban";
import { Timer } from "@phsa.tec/design-system-react/icons/timer";
import { Trash } from "@phsa.tec/design-system-react/icons/trash";

// ---------------------------------------------------------------- Dados

type Status = "todo" | "doing" | "review" | "done";
type Priority = "urgente" | "alta" | "media" | "baixa";

type Task = {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  labels: string[];
  assignee: string;
  due: string;
};

type Draft = Omit<Task, "id">;

// Data fixa: o "hoje" da demo não muda entre servidor e navegador.
const TODAY = "2026-10-20";
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const STATUSES: { value: Status; label: string; icon: typeof Timer; badge: "secondary" | "info" | "warning" | "success" }[] = [
  { value: "todo", label: "A fazer", icon: CircleDashed, badge: "secondary" },
  { value: "doing", label: "Em andamento", icon: Timer, badge: "info" },
  { value: "review", label: "Em revisão", icon: Eye, badge: "warning" },
  { value: "done", label: "Concluído", icon: CircleCheck, badge: "success" },
];

const PRIORITIES: { value: Priority; label: string; icon: typeof Timer; tone: "destructive" | "warning" | "default" | "muted" }[] = [
  { value: "urgente", label: "Urgente", icon: CircleAlert, tone: "destructive" },
  { value: "alta", label: "Alta", icon: SignalHigh, tone: "warning" },
  { value: "media", label: "Média", icon: SignalMedium, tone: "default" },
  { value: "baixa", label: "Baixa", icon: SignalLow, tone: "muted" },
];

const LABELS: Record<string, string> = {
  bug: "Bug",
  feature: "Funcionalidade",
  design: "Design",
  docs: "Documentação",
  infra: "Infraestrutura",
};

const MEMBERS: Record<string, string> = {
  ana: "Ana Costa",
  bruno: "Bruno Lima",
  carla: "Carla Souza",
  diego: "Diego Alves",
  elisa: "Elisa Martins",
};

const INITIAL_TASKS: Task[] = [
  { id: 101, title: "Corrigir cálculo de frete para o Norte", description: "O CEP de Manaus retorna valor zerado no checkout.", status: "doing", priority: "urgente", labels: ["bug"], assignee: "bruno", due: "2026-10-19" },
  { id: 102, title: "Nova tela de onboarding", description: "Três passos com progresso e opção de pular.", status: "todo", priority: "alta", labels: ["feature", "design"], assignee: "carla", due: "2026-10-28" },
  { id: 103, title: "Documentar API de pagamentos", description: "Endpoints de Pix e boleto, com exemplos.", status: "review", priority: "media", labels: ["docs"], assignee: "ana", due: "2026-10-24" },
  { id: 104, title: "Migrar filas para o novo cluster", description: "Sem downtime; janela de manutenção na madrugada.", status: "todo", priority: "alta", labels: ["infra"], assignee: "diego", due: "2026-11-03" },
  { id: 105, title: "Ajustar contraste do tema escuro", description: "Textos secundários abaixo de 4.5:1.", status: "done", priority: "media", labels: ["design", "bug"], assignee: "elisa", due: "2026-10-15" },
  { id: 106, title: "Exportar relatório de vendas em CSV", description: "Filtros de período e loja.", status: "doing", priority: "media", labels: ["feature"], assignee: "ana", due: "2026-10-22" },
  { id: 107, title: "Atualizar dependências do app mobile", description: "", status: "todo", priority: "baixa", labels: ["infra"], assignee: "", due: "2026-11-10" },
  { id: 108, title: "Revisar textos da página de preços", description: "Alinhar com o time de marketing.", status: "review", priority: "baixa", labels: ["docs", "design"], assignee: "carla", due: "2026-10-18" },
  { id: 109, title: "Login com Google falha no Safari", description: "Popup bloqueado em iOS 18.", status: "todo", priority: "urgente", labels: ["bug"], assignee: "bruno", due: "2026-10-21" },
  { id: 110, title: "Alertas de uso de disco", description: "Avisar no canal #infra acima de 80%.", status: "done", priority: "alta", labels: ["infra"], assignee: "diego", due: "2026-10-10" },
  { id: 111, title: "Componente de upload com arrastar e soltar", description: "", status: "doing", priority: "alta", labels: ["feature", "design"], assignee: "elisa", due: "2026-10-30" },
  { id: 112, title: "Guia de contribuição do repositório", description: "", status: "done", priority: "baixa", labels: ["docs"], assignee: "ana", due: "2026-10-12" },
];

const EMPTY_DRAFT: Draft = { title: "", description: "", status: "todo", priority: "media", labels: [], assignee: "", due: "" };

const statusOf = (value: Status) => STATUSES.find((s) => s.value === value)!;
const priorityOf = (value: Priority) => PRIORITIES.find((p) => p.value === value)!;
const codeOf = (task: Task) => `TAR-${task.id}`;
const isOverdue = (task: Task) => task.status !== "done" && !!task.due && task.due < TODAY;
const formatDate = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
};
const splitList = (value: string) => (value ? value.split(",") : []);
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const valueOf = (e: Event) => (e.target as HTMLInputElement).value;
const detailOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;

// A tabela é montada só no navegador.
const noop = () => () => {};
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

// ---------------------------------------------------------------- Pequenos componentes

function PriorityLabel({ priority }: { priority: Priority }) {
  const p = priorityOf(priority);
  return (
    <Stack direction="row" gap="xs" align="center">
      <Icon icon={p.icon} tone={p.tone} />
      <Text variant="small" as="span">
        {p.label}
      </Text>
    </Stack>
  );
}

function DueDate({ task }: { task: Task }) {
  if (!task.due) {
    return (
      <Text variant="small" tone="muted" as="span">
        Sem prazo
      </Text>
    );
  }
  const overdue = isOverdue(task);
  return (
    <Stack direction="row" gap="xs" align="center">
      <Icon icon={overdue ? ClockAlert : Calendar} tone={overdue ? "destructive" : "muted"} label={overdue ? "Atrasada" : undefined} />
      <Text variant="small" tone={overdue ? "destructive" : "muted"} as="span">
        {formatDate(task.due)}
      </Text>
    </Stack>
  );
}

function TaskMenu({ task, onAction }: { task: Task; onAction: (task: Task, action: string) => void }) {
  return (
    <DropdownMenu align="end" onPhsaSelect={(e) => onAction(task, detailOf(e))}>
      <Button slot="trigger" type="button" variant="ghost" size="icon">
        <Icon icon={Ellipsis} label={`Ações de ${codeOf(task)}`} />
      </Button>
      <DropdownItem value="edit">
        <Icon icon={Pencil} />
        Editar
      </DropdownItem>
      <DropdownItem value="duplicate">
        <Icon icon={Copy} />
        Duplicar
      </DropdownItem>
      <DropdownSeparator />
      {STATUSES.filter((s) => s.value !== task.status).map((s) => (
        <DropdownItem key={s.value} value={`move:${s.value}`}>
          <Icon icon={s.icon} />
          Mover para {s.label}
        </DropdownItem>
      ))}
      <DropdownSeparator />
      <DropdownItem value="delete" variant="destructive">
        <Icon icon={Trash} />
        Excluir
      </DropdownItem>
    </DropdownMenu>
  );
}

function TaskCard({ task, onAction }: { task: Task; onAction: (task: Task, action: string) => void }) {
  return (
    <Card>
      <Stack gap="sm">
        <Stack direction="row" justify="between" align="start" gap="sm">
          <Stack gap="xs" grow>
            <Text variant="small" tone="muted" as="span">
              {codeOf(task)}
            </Text>
            <Text weight="medium">{task.title}</Text>
          </Stack>
          <TaskMenu task={task} onAction={onAction} />
        </Stack>
        {task.labels.length > 0 && (
          <Stack direction="row" gap="xs" wrap>
            {task.labels.map((label) => (
              <Badge key={label} variant="outline">
                {LABELS[label]}
              </Badge>
            ))}
          </Stack>
        )}
        <Stack direction="row" justify="between" align="center" gap="sm">
          <PriorityLabel priority={task.priority} />
          <Stack direction="row" gap="sm" align="center">
            <DueDate task={task} />
            <Tooltip text={MEMBERS[task.assignee] ?? "Sem responsável"}>
              <Avatar slot="trigger" size="sm" name={MEMBERS[task.assignee] ?? ""} />
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

// ---------------------------------------------------------------- Página

export default function TasksExample() {
  const mounted = useMounted();

  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [view, setView] = useState("quadro");

  // Filtros
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");

  // Seleção da lista
  const [selected, setSelected] = useState<string[]>([]);

  // Diálogo de criar/editar
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [titleError, setTitleError] = useState("");
  const [formKey, setFormKey] = useState(0);

  // Exclusão
  const [deleting, setDeleting] = useState<Task[] | null>(null);

  // ---------- Filtragem

  const statuses = splitList(statusFilter);
  const priorities = splitList(priorityFilter);
  const assignees = splitList(assigneeFilter);
  const term = query.trim().toLocaleLowerCase("pt-BR");
  const hasFilters = !!term || statuses.length > 0 || priorities.length > 0 || assignees.length > 0;

  const filtered = tasks.filter(
    (task) =>
      (!term ||
        task.title.toLocaleLowerCase("pt-BR").includes(term) ||
        codeOf(task).toLowerCase().includes(term) ||
        task.labels.some((label) => LABELS[label].toLocaleLowerCase("pt-BR").includes(term))) &&
      (!statuses.length || statuses.includes(task.status)) &&
      (!priorities.length || priorities.includes(task.priority)) &&
      (!assignees.length || assignees.includes(task.assignee || "ninguem")),
  );

  const visibleSelected = selected.filter((id) => filtered.some((task) => String(task.id) === id));
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const overdueCount = tasks.filter(isOverdue).length;

  const clearFilters = () => {
    setQuery("");
    setStatusFilter("");
    setPriorityFilter("");
    setAssigneeFilter("");
  };

  // ---------- Ações

  const openForm = (task: Task | null, status: Status = "todo") => {
    if (task) {
      const { id, ...rest } = task;
      setEditingId(id);
      setDraft(rest);
    } else {
      setEditingId("new");
      setDraft({ ...EMPTY_DRAFT, status });
    }
    setTitleError("");
    setFormKey((k) => k + 1);
  };

  const closeForm = () => setEditingId(null);

  const saveForm = () => {
    const title = draft.title.trim();
    if (!title) {
      setTitleError("Dê um título para a tarefa.");
      return;
    }
    const data = { ...draft, title };
    if (editingId === "new") {
      const id = Math.max(100, ...tasks.map((t) => t.id)) + 1;
      setTasks((list) => [...list, { id, ...data }]);
      toast.success("Tarefa criada", { description: `TAR-${id} · ${title}` });
    } else if (editingId !== null) {
      setTasks((list) => list.map((t) => (t.id === editingId ? { id: t.id, ...data } : t)));
      toast("Tarefa atualizada", { description: `TAR-${editingId} · ${title}` });
    }
    setEditingId(null);
  };

  const moveTasks = (ids: number[], status: Status) => {
    const previous = new Map(tasks.filter((t) => ids.includes(t.id)).map((t) => [t.id, t.status]));
    setTasks((list) => list.map((t) => (ids.includes(t.id) ? { ...t, status } : t)));
    toast(ids.length === 1 ? "Tarefa movida" : `${ids.length} tarefas movidas`, {
      description: `Agora em “${statusOf(status).label}”.`,
      action: {
        label: "Desfazer",
        onClick: () => setTasks((list) => list.map((t) => (previous.has(t.id) ? { ...t, status: previous.get(t.id)! } : t))),
      },
    });
  };

  const handleAction = (task: Task, action: string) => {
    if (action === "edit") {
      openForm(task);
    } else if (action === "duplicate") {
      const id = Math.max(100, ...tasks.map((t) => t.id)) + 1;
      setTasks((list) => [...list, { ...task, id, title: `${task.title} (cópia)`, status: "todo" }]);
      toast.success("Tarefa duplicada", { description: `TAR-${id}` });
    } else if (action === "delete") {
      setDeleting([task]);
    } else if (action.startsWith("move:")) {
      moveTasks([task.id], action.slice(5) as Status);
    }
  };

  const confirmDelete = () => {
    if (!deleting) return;
    const removed = deleting;
    const ids = removed.map((t) => t.id);
    setTasks((list) => list.filter((t) => !ids.includes(t.id)));
    setSelected((list) => list.filter((id) => !ids.includes(Number(id))));
    setDeleting(null);
    toast(removed.length === 1 ? "Tarefa excluída" : `${removed.length} tarefas excluídas`, {
      description: removed.length === 1 ? `${codeOf(removed[0])} · ${removed[0].title}` : undefined,
      action: {
        label: "Desfazer",
        onClick: () => setTasks((list) => [...list, ...removed].sort((a, b) => a.id - b.id)),
      },
    });
  };

  const patch = (changes: Partial<Draft>) => setDraft((d) => ({ ...d, ...changes }));

  // ---------- Pedaços da tela

  const empty = hasFilters ? (
    <EmptyState heading="Nenhuma tarefa encontrada" description="Nenhuma tarefa combina com a busca e os filtros atuais.">
      <Icon slot="icon" icon={SearchX} size="lg" />
      <Button slot="actions" type="button" variant="outline" onClick={clearFilters}>
        <Icon icon={FunnelX} />
        Limpar filtros
      </Button>
    </EmptyState>
  ) : (
    <EmptyState heading="Nenhuma tarefa ainda" description="Crie a primeira tarefa para começar a organizar o trabalho do time.">
      <Icon slot="icon" icon={ListTodo} size="lg" />
      <Button slot="actions" type="button" onClick={() => openForm(null)}>
        <Icon icon={Plus} />
        Nova tarefa
      </Button>
    </EmptyState>
  );

  const deletingOne = deleting?.length === 1 ? deleting[0] : null;

  return (
    <Stack padding="lg" gap="lg">
      {/* ---------------- Cabeçalho ---------------- */}
      <Stack direction="row" justify="between" align="center" gap="md" wrap>
        <Stack gap="xs">
          <Text variant="h2" as="h1">
            Tarefas
          </Text>
          <Text tone="muted">
            {plural(tasks.length, "tarefa", "tarefas")} · {plural(doneCount, "concluída", "concluídas")}
            {overdueCount > 0 && ` · ${plural(overdueCount, "atrasada", "atrasadas")}`}
          </Text>
        </Stack>
        <Stack direction="row" gap="md" align="center">
          <AvatarGroup max={4}>
            {Object.values(MEMBERS).map((name) => (
              <Avatar key={name} size="sm" name={name} />
            ))}
          </AvatarGroup>
          <Button type="button" onClick={() => openForm(null)}>
            <Icon icon={Plus} />
            Nova tarefa
          </Button>
        </Stack>
      </Stack>

      <Progress value={tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0} label="Progresso da sprint" />

      {/* ---------------- Filtros ---------------- */}
      <Grid minItemWidth="12rem" gap="sm" align="end">
        <Input
          size="sm"
          label="Buscar"
          placeholder="Título, código ou etiqueta"
          clearable
          value={query}
          onInput={(e) => setQuery(valueOf(e))}
        >
          <Icon slot="prefix" icon={Search} />
        </Input>
        <Select size="sm" label="Status" placeholder="Todos" multiple maxVisible={1} value={statusFilter} onChange={(e) => setStatusFilter(valueOf(e))}>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
        <Select size="sm" label="Prioridade" placeholder="Todas" multiple maxVisible={1} value={priorityFilter} onChange={(e) => setPriorityFilter(valueOf(e))}>
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </Select>
        <Select size="sm" label="Responsável" placeholder="Todos" multiple maxVisible={1} value={assigneeFilter} onChange={(e) => setAssigneeFilter(valueOf(e))}>
          {Object.entries(MEMBERS).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
          <option value="ninguem">Sem responsável</option>
        </Select>
      </Grid>

      <Stack direction="row" justify="between" align="center" gap="sm" wrap>
        <Text variant="small" tone="muted">
          {hasFilters ? `Mostrando ${filtered.length} de ${tasks.length} tarefas` : `Todas as ${plural(tasks.length, "tarefa", "tarefas")}`}
        </Text>
        {hasFilters && (
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            <Icon icon={FunnelX} />
            Limpar filtros
          </Button>
        )}
      </Stack>

      {/* ---------------- Visualizações ---------------- */}
      <Tabs value={view} onPhsaChange={(e) => setView(detailOf(e))}>
        <Tab slot="tab" value="quadro">
          <Icon icon={SquareKanban} />
          Quadro
        </Tab>
        <Tab slot="tab" value="lista">
          <Icon icon={List} />
          Lista
        </Tab>

        <TabPanel value="quadro">
          {filtered.length === 0 ? (
            empty
          ) : (
            <Grid minItemWidth="15rem" gap="md" align="start">
              {STATUSES.map((status) => {
                const column = filtered.filter((t) => t.status === status.value);
                return (
                  <Stack key={status.value} background="muted" radius="lg" padding="sm" gap="sm">
                    <Stack direction="row" justify="between" align="center" gap="sm">
                      <Stack direction="row" gap="sm" align="center">
                        <Icon icon={status.icon} tone="muted" />
                        <Text weight="semibold" as="span">
                          {status.label}
                        </Text>
                        <Badge variant="secondary">{column.length}</Badge>
                      </Stack>
                      <Tooltip text={`Nova tarefa em “${status.label}”`}>
                        <Button slot="trigger" type="button" variant="ghost" size="icon" onClick={() => openForm(null, status.value)}>
                          <Icon icon={Plus} label={`Nova tarefa em ${status.label}`} />
                        </Button>
                      </Tooltip>
                    </Stack>
                    {column.map((task) => (
                      <TaskCard key={task.id} task={task} onAction={handleAction} />
                    ))}
                    {column.length === 0 && (
                      <Stack padding="lg" align="center">
                        <Text variant="small" tone="muted">
                          Nenhuma tarefa
                        </Text>
                      </Stack>
                    )}
                  </Stack>
                );
              })}
            </Grid>
          )}
        </TabPanel>

        <TabPanel value="lista">
          <Stack gap="sm">
            {visibleSelected.length > 0 && (
              <Stack direction="row" justify="between" align="center" gap="sm" wrap background="muted" radius="md" padding="sm">
                <Text variant="small" weight="medium">
                  {plural(visibleSelected.length, "tarefa selecionada", "tarefas selecionadas")}
                </Text>
                <Stack direction="row" gap="sm">
                  <DropdownMenu
                    align="end"
                    onPhsaSelect={(e) => moveTasks(visibleSelected.map(Number), detailOf(e) as Status)}
                  >
                    <Button slot="trigger" type="button" variant="outline" size="sm">
                      <Icon icon={ArrowRightLeft} />
                      Mover para…
                    </Button>
                    {STATUSES.map((s) => (
                      <DropdownItem key={s.value} value={s.value}>
                        <Icon icon={s.icon} />
                        {s.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleting(tasks.filter((t) => visibleSelected.includes(String(t.id))))}
                  >
                    <Icon icon={Trash} />
                    Excluir
                  </Button>
                </Stack>
              </Stack>
            )}

            {filtered.length === 0
              ? empty
              : mounted && (
                  <Table
                    selectable
                    onPhsaSelectionChange={(e) => setSelected((e as CustomEvent<{ values: string[] }>).detail.values)}
                  >
                    <Column label="Código" width="6.5rem" sortable />
                    <Column label="Tarefa" sortable />
                    <Column label="Status" width="9.5rem" />
                    <Column label="Prioridade" width="8rem" />
                    <Column label="Responsável" width="11rem" sortable />
                    <Column label="Prazo" width="6.5rem" />
                    <Column label="" width="3.5rem" align="right" />
                    {filtered.map((task) => {
                      const status = statusOf(task.status);
                      return (
                        <Row key={task.id} value={String(task.id)} selected={visibleSelected.includes(String(task.id))}>
                          <Cell>
                            <Text variant="small" tone="muted" as="span">
                              {codeOf(task)}
                            </Text>
                          </Cell>
                          <Cell>
                            <Stack direction="row" gap="sm" align="center" wrap>
                              <Text weight="medium" as="span">
                                {task.title}
                              </Text>
                              {task.labels.map((label) => (
                                <Badge key={label} variant="outline">
                                  {LABELS[label]}
                                </Badge>
                              ))}
                            </Stack>
                          </Cell>
                          <Cell>
                            <Badge variant={status.badge}>
                              <Icon icon={status.icon} size="xs" />
                              {status.label}
                            </Badge>
                          </Cell>
                          <Cell>
                            <PriorityLabel priority={task.priority} />
                          </Cell>
                          <Cell>
                            <Stack direction="row" gap="sm" align="center">
                              <Avatar size="sm" name={MEMBERS[task.assignee] ?? ""} />
                              <Text variant="small" tone={task.assignee ? "inherit" : "muted"} as="span">
                                {MEMBERS[task.assignee] ?? "Sem responsável"}
                              </Text>
                            </Stack>
                          </Cell>
                          <Cell>
                            <DueDate task={task} />
                          </Cell>
                          <Cell>
                            <TaskMenu task={task} onAction={handleAction} />
                          </Cell>
                        </Row>
                      );
                    })}
                  </Table>
                )}
          </Stack>
        </TabPanel>
      </Tabs>

      {/* ---------------- Criar / editar ---------------- */}
      <Dialog
        open={editingId !== null}
        size="lg"
        responsiveFullscreen
        heading={editingId === "new" ? "Nova tarefa" : `Editar TAR-${editingId ?? ""}`}
        description={editingId === "new" ? "Preencha os detalhes; dá para mudar tudo depois." : "As alterações valem só para esta sessão."}
        onClose={closeForm}
      >
        <Stack key={formKey} gap="md">
          <Input
            label="Título"
            placeholder="Ex.: Corrigir erro no checkout"
            required
            value={draft.title}
            error={titleError}
            onInput={(e) => {
              patch({ title: valueOf(e) });
              setTitleError("");
            }}
          />
          <Textarea
            label="Descrição"
            placeholder="Contexto, critérios de aceite, links…"
            rows={3}
            value={draft.description}
            onInput={(e) => patch({ description: valueOf(e) })}
          />
          <Grid columns={2} stackBelow="sm" gap="md">
            <Select label="Status" value={draft.status} onChange={(e) => patch({ status: valueOf(e) as Status })}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
            <Select label="Prioridade" value={draft.priority} onChange={(e) => patch({ priority: valueOf(e) as Priority })}>
              {PRIORITIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>
            <Combobox
              label="Responsável"
              placeholder="Buscar pessoa"
              value={draft.assignee}
              onChange={(e) => patch({ assignee: valueOf(e) })}
            >
              {Object.entries(MEMBERS).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Combobox>
            <DatePicker
              label="Prazo"
              placeholder="Sem prazo"
              value={draft.due}
              onInput={(e) => patch({ due: valueOf(e) })}
            />
          </Grid>
          <Select
            label="Etiquetas"
            placeholder="Nenhuma"
            multiple
            value={draft.labels.join(",")}
            onChange={(e) => patch({ labels: splitList(valueOf(e)) })}
          >
            {Object.entries(LABELS).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </Select>
        </Stack>
        <Button slot="footer" type="button" variant="outline" onClick={closeForm}>
          Cancelar
        </Button>
        <Button slot="footer" type="button" onClick={saveForm}>
          {editingId === "new" ? "Criar tarefa" : "Salvar"}
        </Button>
      </Dialog>

      {/* ---------------- Excluir ---------------- */}
      <AlertDialog
        open={deleting !== null}
        variant="destructive"
        heading={deletingOne ? `Excluir ${codeOf(deletingOne)}?` : `Excluir ${deleting?.length ?? 0} tarefas?`}
        description={
          deletingOne
            ? `“${deletingOne.title}” sai do quadro e da lista. Dá para desfazer logo em seguida.`
            : "As tarefas selecionadas saem do quadro e da lista. Dá para desfazer logo em seguida."
        }
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onPhsaConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
    </Stack>
  );
}
