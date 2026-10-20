"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Cell,
  Column,
  DatePicker,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  Grid,
  Icon,
  Pagination,
  Progress,
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
} from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";
import { DollarSign } from "@phsa.tec/design-system-react/icons/dollar-sign";
import { Download } from "@phsa.tec/design-system-react/icons/download";
import { Ellipsis } from "@phsa.tec/design-system-react/icons/ellipsis";
import { Package } from "@phsa.tec/design-system-react/icons/package";
import { Receipt } from "@phsa.tec/design-system-react/icons/receipt";
import { RefreshCw } from "@phsa.tec/design-system-react/icons/refresh-cw";
import { ShoppingBag } from "@phsa.tec/design-system-react/icons/shopping-bag";
import { Star } from "@phsa.tec/design-system-react/icons/star";
import { TrendingDown } from "@phsa.tec/design-system-react/icons/trending-down";
import { TrendingUp } from "@phsa.tec/design-system-react/icons/trending-up";
import { Truck } from "@phsa.tec/design-system-react/icons/truck";
import { UserPlus } from "@phsa.tec/design-system-react/icons/user-plus";

/* ------------------------------------------------------------------ dados */

type Period = "7d" | "30d" | "90d";
type IconNode = typeof DollarSign;

const PERIOD_LABEL: Record<Period, string> = {
  "7d": "Últimos 7 dias",
  "30d": "Últimos 30 dias",
  "90d": "Últimos 90 dias",
};

type Kpi = { label: string; icon: IconNode; value: string; delta: number };

const KPIS: Record<Period, Kpi[]> = {
  "7d": [
    { label: "Receita", icon: DollarSign, value: "R$ 12.480,90", delta: 8.2 },
    { label: "Pedidos", icon: ShoppingBag, value: "84", delta: 5.1 },
    { label: "Ticket médio", icon: Receipt, value: "R$ 148,58", delta: 2.9 },
    { label: "Clientes novos", icon: UserPlus, value: "23", delta: -4.3 },
  ],
  "30d": [
    { label: "Receita", icon: DollarSign, value: "R$ 48.320,40", delta: 12.4 },
    { label: "Pedidos", icon: ShoppingBag, value: "312", delta: 9.7 },
    { label: "Ticket médio", icon: Receipt, value: "R$ 154,87", delta: 2.5 },
    { label: "Clientes novos", icon: UserPlus, value: "86", delta: 18.0 },
  ],
  "90d": [
    { label: "Receita", icon: DollarSign, value: "R$ 139.775,10", delta: 21.6 },
    { label: "Pedidos", icon: ShoppingBag, value: "947", delta: 15.2 },
    { label: "Ticket médio", icon: Receipt, value: "R$ 147,60", delta: -1.8 },
    { label: "Clientes novos", icon: UserPlus, value: "241", delta: 11.3 },
  ],
};

type Bar = { label: string; value: number };

const SALES: Record<Period, { title: string; bars: Bar[] }> = {
  "7d": {
    title: "Vendas por dia",
    bars: [
      { label: "Seg", value: 1480 },
      { label: "Ter", value: 1720 },
      { label: "Qua", value: 1310 },
      { label: "Qui", value: 2050 },
      { label: "Sex", value: 2640 },
      { label: "Sáb", value: 2190 },
      { label: "Dom", value: 1090 },
    ],
  },
  "30d": {
    title: "Vendas por semana",
    bars: [
      { label: "Semana 1", value: 10420 },
      { label: "Semana 2", value: 11980 },
      { label: "Semana 3", value: 12940 },
      { label: "Semana 4", value: 12980 },
    ],
  },
  "90d": {
    title: "Vendas por mês",
    bars: [
      { label: "Agosto", value: 41230 },
      { label: "Setembro", value: 50220 },
      { label: "Outubro", value: 48325 },
    ],
  },
};

const GOALS = [
  { label: "Receita", current: 48320, target: 60000, format: "money" },
  { label: "Pedidos", current: 312, target: 400, format: "number" },
  { label: "Clientes novos", current: 86, target: 100, format: "number" },
  { label: "Avaliações 5 estrelas", current: 118, target: 120, format: "number" },
] as const;

const CATEGORIES = [
  { label: "Cosméticos naturais", share: 34 },
  { label: "Velas e aromas", share: 26 },
  { label: "Cerâmica artesanal", share: 18 },
  { label: "Chás e infusões", share: 14 },
  { label: "Papelaria", share: 8 },
];

const CHANNELS = [
  { label: "Busca orgânica", share: 41 },
  { label: "Instagram", share: 29 },
  { label: "Indicação", share: 17 },
  { label: "E-mail marketing", share: 13 },
];

type Status = "pago" | "pendente" | "enviado" | "entregue" | "cancelado";

const STATUS: Record<Status, { label: string; variant: "success" | "warning" | "info" | "secondary" | "destructive" }> = {
  pago: { label: "Pago", variant: "success" },
  pendente: { label: "Pendente", variant: "warning" },
  enviado: { label: "Enviado", variant: "info" },
  entregue: { label: "Entregue", variant: "secondary" },
  cancelado: { label: "Cancelado", variant: "destructive" },
};

type Order = { id: string; customer: string; email: string; status: Status; payment: string; total: number };

const INITIAL_ORDERS: Order[] = [
  { id: "#3210", customer: "Helena Martins", email: "helena.m@exemplo.com", status: "pago", payment: "Pix", total: 189.9 },
  { id: "#3209", customer: "Otávio Ribeiro", email: "otavio.r@exemplo.com", status: "pendente", payment: "Boleto", total: 74.5 },
  { id: "#3208", customer: "Lívia Fernandes", email: "livia.f@exemplo.com", status: "enviado", payment: "Cartão", total: 312.0 },
  { id: "#3207", customer: "Caio Moreira", email: "caio.m@exemplo.com", status: "entregue", payment: "Pix", total: 58.9 },
  { id: "#3206", customer: "Beatriz Nogueira", email: "bia.n@exemplo.com", status: "pago", payment: "Cartão", total: 245.3 },
  { id: "#3205", customer: "Rodrigo Teixeira", email: "rodrigo.t@exemplo.com", status: "cancelado", payment: "Cartão", total: 129.0 },
  { id: "#3204", customer: "Sofia Andrade", email: "sofia.a@exemplo.com", status: "entregue", payment: "Pix", total: 97.4 },
  { id: "#3203", customer: "Gustavo Pires", email: "gustavo.p@exemplo.com", status: "enviado", payment: "Boleto", total: 164.8 },
  { id: "#3202", customer: "Manuela Duarte", email: "manu.d@exemplo.com", status: "entregue", payment: "Cartão", total: 420.0 },
  { id: "#3201", customer: "Heitor Campos", email: "heitor.c@exemplo.com", status: "pago", payment: "Pix", total: 66.7 },
  { id: "#3200", customer: "Alice Barbosa", email: "alice.b@exemplo.com", status: "entregue", payment: "Cartão", total: 138.2 },
  { id: "#3199", customer: "Davi Cardoso", email: "davi.c@exemplo.com", status: "entregue", payment: "Pix", total: 211.5 },
];

const ACTIVITY = [
  { icon: ShoppingBag, tone: "primary", text: "Novo pedido #3210 de Helena Martins", time: "há 4 min" },
  { icon: Star, tone: "warning", text: "Avaliação 5 estrelas em “Vela de lavanda”", time: "há 22 min" },
  { icon: Truck, tone: "info", text: "Pedido #3208 saiu para entrega", time: "há 1 h" },
  { icon: Package, tone: "destructive", text: "Estoque baixo: “Sabonete de argila” (3 un.)", time: "há 2 h" },
  { icon: UserPlus, tone: "success", text: "Sofia Andrade criou uma conta", time: "há 5 h" },
] as const;

const PAGE_SIZE = 5;

/* ------------------------------------------------------------- utilidades */

const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const percent = (n: number) => `${n > 0 ? "+" : ""}${n.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`;
const detailValue = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;
const targetValue = (e: Event) => (e.target as HTMLInputElement).value;

// O `Table` só monta no cliente; `useSyncExternalStore` evita o setState dentro de um effect.
const noop = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

/* ---------------------------------------------------------- componentes */

function KpiCard({ kpi }: { kpi: Kpi }) {
  const up = kpi.delta >= 0;
  return (
    <Card>
      <Stack slot="title" direction="row" align="center" justify="between" gap="sm">
        <Text variant="small" weight="medium" tone="muted" as="span">
          {kpi.label}
        </Text>
        <Icon icon={kpi.icon} tone="muted" />
      </Stack>
      <Stack gap="xs">
        <Text variant="h2" as="span">
          {kpi.value}
        </Text>
        <Stack direction="row" align="center" gap="xs" wrap>
          <Badge variant={up ? "success" : "destructive"}>
            <Icon icon={up ? TrendingUp : TrendingDown} size="xs" />
            {percent(kpi.delta)}
          </Badge>
          <Text variant="small" tone="muted" as="span">
            vs. período anterior
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}

type BarListProps = { bars: Bar[]; format: (n: number) => string; max?: number };

// "Gráfico" de barras horizontais feito só com Progress: sem `max`, a maior barra ocupa a largura toda.
function BarList({ bars, format, max = Math.max(...bars.map((b) => b.value)) }: BarListProps) {
  return (
    <Stack gap="md">
      {bars.map((bar) => (
        <Stack key={bar.label} gap="xs">
          <Stack direction="row" justify="between" gap="sm">
            <Text variant="small" weight="medium" as="span">
              {bar.label}
            </Text>
            <Text variant="small" tone="muted" as="span">
              {format(bar.value)}
            </Text>
          </Stack>
          <Progress value={bar.value} max={max} label={`${bar.label}: ${format(bar.value)}`} />
        </Stack>
      ))}
    </Stack>
  );
}

/* ----------------------------------------------------------------- página */

export default function DashboardExample() {
  const mounted = useMounted();
  const [tab, setTab] = useState("geral");
  const [period, setPeriod] = useState<Period>("30d");
  const [exporting, setExporting] = useState(false);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [page, setPage] = useState(1);

  // Relatório
  const [range, setRange] = useState("2026-10-01/2026-10-20");
  const [format, setFormat] = useState("pdf");
  const [withCanceled, setWithCanceled] = useState(false);
  const [generating, setGenerating] = useState(false);

  const pageCount = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const visible = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const sales = SALES[period];

  const handleExport = async () => {
    setExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setExporting(false);
    toast.success("Exportação concluída", { description: `aurora-painel-${period}.csv (demo)` });
  };

  const handleGenerate = async () => {
    if (!range.includes("/")) {
      toast.error("Escolha o início e o fim do período");
      return;
    }
    setGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setGenerating(false);
    const [from, to] = range.split("/").map((d) => d.split("-").reverse().join("/"));
    toast.success("Relatório gerado", {
      description: `${from} a ${to} · ${format.toUpperCase()}${withCanceled ? " · com cancelados" : ""}`,
    });
  };

  const setStatus = (order: Order, status: Status) =>
    setOrders((list) => list.map((o) => (o.id === order.id ? { ...o, status } : o)));

  const handleOrderAction = (order: Order, action: string) => {
    if (action === "details") {
      toast(`Pedido ${order.id}`, { description: `${order.customer} · ${money(order.total)} · ${order.payment}` });
    } else if (action === "ship") {
      setStatus(order, "enviado");
      toast.success(`Pedido ${order.id} marcado como enviado`);
    } else if (action === "cancel") {
      const previous = order.status;
      setStatus(order, "cancelado");
      toast(`Pedido ${order.id} cancelado`, {
        description: order.customer,
        action: { label: "Desfazer", onClick: () => setStatus(order, previous) },
      });
    }
  };

  return (
    <Stack background="muted" padding="lg" gap="lg">
      {/* ---------- barra superior ---------- */}
      <Stack direction="row" align="center" justify="between" gap="md" wrap>
        <Stack direction="row" align="center" gap="sm">
          <Avatar name="Loja Aurora" shape="square" />
          <Stack gap="none">
            <Text variant="h3" as="h1">
              Painel
            </Text>
            <Text variant="small" tone="muted" as="span">
              Loja Aurora · {PERIOD_LABEL[period].toLowerCase()}
            </Text>
          </Stack>
        </Stack>
        <Stack direction="row" align="center" gap="sm">
          <Select
            size="sm"
            value={period}
            onChange={(e) => {
              setPeriod((e.target as HTMLSelectElement).value as Period);
              setPage(1);
            }}
          >
            <option value="7d">{PERIOD_LABEL["7d"]}</option>
            <option value="30d">{PERIOD_LABEL["30d"]}</option>
            <option value="90d">{PERIOD_LABEL["90d"]}</option>
          </Select>
          <Button type="button" size="sm" loading={exporting} loadingLabel="Exportando" onClick={handleExport}>
            <Icon icon={Download} />
            Exportar
          </Button>
        </Stack>
      </Stack>

      <Tabs value={tab} onPhsaChange={(e) => setTab(detailValue(e))}>
        <Tab slot="tab" value="geral">
          Visão geral
        </Tab>
        <Tab slot="tab" value="relatorio">
          Relatório
        </Tab>

        {/* ---------- visão geral ---------- */}
        <TabPanel value="geral">
          <Stack gap="lg">
            <Grid minItemWidth="13rem">
              {KPIS[period].map((kpi) => (
                <KpiCard key={kpi.label} kpi={kpi} />
              ))}
            </Grid>

            <Grid columns={2} stackBelow="md">
              <Card heading={sales.title} description={`Receita bruta · ${PERIOD_LABEL[period].toLowerCase()}`}>
                <BarList bars={sales.bars} format={money} />
              </Card>

              <Card heading="Metas do mês" description="Outubro de 2026 · faltam 11 dias">
                <Stack gap="md">
                  {GOALS.map((goal) => {
                    const fmt = goal.format === "money" ? money : (n: number) => n.toLocaleString("pt-BR");
                    const pct = Math.round((goal.current / goal.target) * 100);
                    return (
                      <Stack key={goal.label} gap="xs">
                        <Stack direction="row" justify="between" align="baseline" gap="sm">
                          <Text variant="small" weight="medium" as="span">
                            {goal.label}
                          </Text>
                          <Text variant="small" tone={pct >= 90 ? "success" : "muted"} as="span">
                            {fmt(goal.current)} de {fmt(goal.target)} · {pct}%
                          </Text>
                        </Stack>
                        <Progress value={goal.current} max={goal.target} label={`Meta de ${goal.label.toLowerCase()}`} />
                      </Stack>
                    );
                  })}
                </Stack>
                <Button
                  slot="footer"
                  type="button"
                  variant="outline"
                  block
                  onClick={() => toast("Edição de metas (demo)")}
                >
                  Ajustar metas
                </Button>
              </Card>
            </Grid>

            <Card>
              <Stack slot="title" direction="row" align="center" justify="between" gap="sm" wrap>
                Pedidos recentes
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setOrders(INITIAL_ORDERS);
                    setPage(1);
                    toast("Lista atualizada");
                  }}
                >
                  <Icon icon={RefreshCw} />
                  Atualizar
                </Button>
              </Stack>
              <Text slot="description" tone="muted">
                {orders.length} pedidos · {orders.filter((o) => o.status === "pendente").length} aguardando pagamento
              </Text>
              <Stack gap="md">
                {mounted && (
                  <Table>
                    <Column label="Pedido" width="6rem" />
                    <Column label="Cliente" />
                    <Column label="Status" />
                    <Column label="Pagamento" />
                    <Column label="Total" align="right" />
                    <Column label="" width="3.5rem" />
                    {visible.map((order) => (
                      <Row key={order.id}>
                        <Cell>
                          <Text weight="medium" as="span">
                            {order.id}
                          </Text>
                        </Cell>
                        <Cell>
                          <Stack direction="row" align="center" gap="sm">
                            <Avatar name={order.customer} size="sm" />
                            <Stack gap="none">
                              <Text variant="small" weight="medium" as="span">
                                {order.customer}
                              </Text>
                              <Text variant="small" tone="muted" as="span">
                                {order.email}
                              </Text>
                            </Stack>
                          </Stack>
                        </Cell>
                        <Cell>
                          <Badge variant={STATUS[order.status].variant}>{STATUS[order.status].label}</Badge>
                        </Cell>
                        <Cell>{order.payment}</Cell>
                        <Cell>{money(order.total)}</Cell>
                        <Cell>
                          <DropdownMenu align="end" onPhsaSelect={(e) => handleOrderAction(order, detailValue(e))}>
                            <Button slot="trigger" type="button" variant="ghost" size="icon" aria-label={`Ações do pedido ${order.id}`}>
                              <Icon icon={Ellipsis} />
                            </Button>
                            <DropdownItem value="details">Ver detalhes</DropdownItem>
                            <DropdownItem value="ship" disabled={order.status !== "pago"}>
                              Marcar como enviado
                            </DropdownItem>
                            <DropdownSeparator />
                            <DropdownItem
                              value="cancel"
                              variant="destructive"
                              disabled={order.status === "cancelado" || order.status === "entregue"}
                            >
                              Cancelar pedido
                            </DropdownItem>
                          </DropdownMenu>
                        </Cell>
                      </Row>
                    ))}
                  </Table>
                )}
                <Stack direction="row" align="center" justify="between" gap="sm" wrap>
                  <Text variant="small" tone="muted" as="span">
                    Mostrando {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, orders.length)} de {orders.length}
                  </Text>
                  <Pagination
                    page={page}
                    pageCount={pageCount}
                    label="Paginação dos pedidos"
                    onPhsaChange={(e) => setPage((e as CustomEvent<{ page: number }>).detail.page)}
                  />
                </Stack>
              </Stack>
            </Card>

            <Grid columns={2} stackBelow="md">
              <Card heading="Atividade" description="O que aconteceu na loja hoje.">
                <Stack gap="sm">
                  {ACTIVITY.map((item, index) => (
                    <Stack key={item.text} gap="sm">
                      {index > 0 && <Separator />}
                      <Stack direction="row" align="center" gap="md">
                        <Stack background="background" bordered radius="full" padding="sm">
                          <Icon icon={item.icon} tone={item.tone} />
                        </Stack>
                        <Stack gap="none" grow>
                          <Text variant="small" weight="medium" as="span">
                            {item.text}
                          </Text>
                          <Text variant="small" tone="muted" as="span">
                            {item.time}
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Card>

              <Card heading="Vendas por categoria" description="Participação na receita do período.">
                <BarList
                  bars={CATEGORIES.map((c) => ({ label: c.label, value: c.share }))}
                  format={(n) => `${n}%`}
                  max={100}
                />
              </Card>
            </Grid>
          </Stack>
        </TabPanel>

        {/* ---------- relatório ---------- */}
        <TabPanel value="relatorio">
          <Grid columns={2} stackBelow="md">
            <Card heading="Gerar relatório" description="Monte um relatório de vendas para o período que quiser.">
              <Stack gap="md">
                <DatePicker
                  label="Período"
                  mode="range"
                  max="2026-10-20"
                  value={range}
                  onInput={(e) => setRange(targetValue(e))}
                />
                <Select label="Formato" value={format} onChange={(e) => setFormat((e.target as HTMLSelectElement).value)}>
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV (planilha)</option>
                  <option value="xlsx">Excel</option>
                </Select>
                <Switch
                  label="Incluir pedidos cancelados"
                  description="Aparecem em uma seção separada."
                  checked={withCanceled}
                  onChange={(e) => setWithCanceled((e.target as HTMLInputElement).checked)}
                />
              </Stack>
              <Stack slot="footer" direction="row" gap="sm" justify="end" grow>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setRange("2026-10-01/2026-10-20");
                    setFormat("pdf");
                    setWithCanceled(false);
                  }}
                >
                  Restaurar
                </Button>
                <Button type="button" loading={generating} loadingLabel="Gerando" onClick={handleGenerate}>
                  Gerar relatório
                </Button>
              </Stack>
            </Card>

            <Stack gap="md">
              <Card heading="Resumo do período" description={PERIOD_LABEL[period]}>
                <Grid columns={2} gap="md">
                  {KPIS[period].map((kpi) => (
                    <Stack key={kpi.label} gap="none">
                      <Text variant="small" tone="muted" as="span">
                        {kpi.label}
                      </Text>
                      <Text variant="h4" as="span">
                        {kpi.value}
                      </Text>
                      <Text variant="small" tone={kpi.delta >= 0 ? "success" : "destructive"} as="span">
                        {percent(kpi.delta)}
                      </Text>
                    </Stack>
                  ))}
                </Grid>
              </Card>

              <Card heading="Canais de aquisição" description="De onde vieram os pedidos.">
                <BarList bars={CHANNELS.map((c) => ({ label: c.label, value: c.share }))} format={(n) => `${n}%`} max={100} />
              </Card>
            </Stack>
          </Grid>
        </TabPanel>
      </Tabs>
    </Stack>
  );
}
