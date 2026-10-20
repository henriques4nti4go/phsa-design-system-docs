"use client";

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Grid,
  Icon,
  Input,
  PatternInput,
  Radio,
  RadioGroup,
  Select,
  Separator,
  Spinner,
  Stack,
  Step,
  Stepper,
  Tab,
  TabPanel,
  Tabs,
  Text,
} from "@phsa.tec/design-system-react/react";
import { toast } from "@phsa.tec/design-system-react/toast";
import { ArrowLeft } from "@phsa.tec/design-system-react/icons/arrow-left";
import { ArrowRight } from "@phsa.tec/design-system-react/icons/arrow-right";
import { Barcode } from "@phsa.tec/design-system-react/icons/barcode";
import { CircleCheck } from "@phsa.tec/design-system-react/icons/circle-check";
import { Copy } from "@phsa.tec/design-system-react/icons/copy";
import { CreditCard } from "@phsa.tec/design-system-react/icons/credit-card";
import { GlassWater } from "@phsa.tec/design-system-react/icons/glass-water";
import { Headphones } from "@phsa.tec/design-system-react/icons/headphones";
import { Lock } from "@phsa.tec/design-system-react/icons/lock";
import { MapPin } from "@phsa.tec/design-system-react/icons/map-pin";
import { Minus } from "@phsa.tec/design-system-react/icons/minus";
import { Plus } from "@phsa.tec/design-system-react/icons/plus";
import { QrCode } from "@phsa.tec/design-system-react/icons/qr-code";
import { ShieldCheck } from "@phsa.tec/design-system-react/icons/shield-check";
import { Shirt } from "@phsa.tec/design-system-react/icons/shirt";
import { ShoppingBag } from "@phsa.tec/design-system-react/icons/shopping-bag";
import { ShoppingCart } from "@phsa.tec/design-system-react/icons/shopping-cart";
import { TicketPercent } from "@phsa.tec/design-system-react/icons/ticket-percent";
import { Trash } from "@phsa.tec/design-system-react/icons/trash";
import { Truck } from "@phsa.tec/design-system-react/icons/truck";
import { X } from "@phsa.tec/design-system-react/icons/x";

// Loja, produtos, endereços e códigos fictícios: nada aqui é real.

type IconNode = typeof ShoppingBag;
type Item = { id: number; name: string; variant: string; price: number; qty: number; icon: IconNode };
type Shipping = "pac" | "sedex" | "retirada";
type Payment = "pix" | "cartao" | "boleto";
type Errors = Record<string, string>;

const STEPS = [
  { value: "carrinho", heading: "Carrinho", description: "Revise os itens" },
  { value: "entrega", heading: "Entrega", description: "Endereço e frete" },
  { value: "pagamento", heading: "Pagamento", description: "Pix, cartão ou boleto" },
  { value: "confirmacao", heading: "Confirmação", description: "Pedido realizado" },
];

const INITIAL_ITEMS: Item[] = [
  { id: 1, name: "Fone Bluetooth Aurora Pulse", variant: "Preto · Cancelamento de ruído", price: 349.9, qty: 1, icon: Headphones },
  { id: 2, name: "Camiseta Algodão Orgânico", variant: "Tamanho M · Areia", price: 89.9, qty: 2, icon: Shirt },
  { id: 3, name: "Garrafa Térmica 750 ml", variant: "Aço inox · Verde-musgo", price: 129.9, qty: 1, icon: GlassWater },
];

const SHIPPING: Record<Shipping, { label: string; eta: string; price: number }> = {
  pac: { label: "PAC", eta: "6 a 9 dias úteis", price: 19.9 },
  sedex: { label: "SEDEX", eta: "2 a 3 dias úteis", price: 34.9 },
  retirada: { label: "Retirar na loja", eta: "Pronto em 2 horas · Loja Aurora Centro", price: 0 },
};

const PAYMENT_LABEL: Record<Payment, string> = { pix: "Pix", cartao: "Cartão de crédito", boleto: "Boleto bancário" };

const COUPON = { code: "AURORA10", rate: 0.1 };
const PIX_RATE = 0.05;
const PIX_CODE = "00020126580014br.gov.bcb.pix0136aurora-store-demo-0000-0000-000052040000530398654041.005802BR5912AURORA STORE6009SAO PAULO62070503***6304ABCD";
const MAX_QTY = 10;

const UFS = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];

// "Busca" de CEP falsa: o primeiro dígito escolhe uma região, como nos CEPs de verdade.
const FAKE_ADDRESSES = [
  { rua: "Rua das Acácias", bairro: "Jardim Aurora", cidade: "São Paulo", uf: "SP" },
  { rua: "Avenida dos Ipês", bairro: "Vila Esperança", cidade: "Campinas", uf: "SP" },
  { rua: "Rua do Farol", bairro: "Praia Serena", cidade: "Niterói", uf: "RJ" },
  { rua: "Rua da Serra Azul", bairro: "Alto dos Pinheiros", cidade: "Belo Horizonte", uf: "MG" },
  { rua: "Ladeira do Sol", bairro: "Rio Vermelho", cidade: "Salvador", uf: "BA" },
  { rua: "Rua das Jangadas", bairro: "Boa Vista", cidade: "Recife", uf: "PE" },
  { rua: "Avenida Beira-Mar", bairro: "Meireles", cidade: "Fortaleza", uf: "CE" },
  { rua: "Quadra das Palmeiras", bairro: "Asa Norte", cidade: "Brasília", uf: "DF" },
  { rua: "Rua das Araucárias", bairro: "Batel", cidade: "Curitiba", uf: "PR" },
  { rua: "Rua dos Jacarandás", bairro: "Moinhos de Vento", cidade: "Porto Alegre", uf: "RS" },
];

const EMPTY_ADDRESS = { cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "" };
const EMPTY_CARD = { numero: "", nome: "", validade: "", cvv: "", parcelas: "1" };

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const money = (value: number) => brl.format(value);

const valueOf = (e: Event) => (e.target as HTMLInputElement).value;
const detailOf = (e: Event) => (e as CustomEvent<{ value: string }>).detail.value;

function SummaryLine({ label, value, tone }: { label: string; value: string; tone?: "success" | "muted" }) {
  return (
    <Stack direction="row" justify="between" gap="md">
      <Text tone="muted" as="span">
        {label}
      </Text>
      <Text as="span" tone={tone ?? "default"} weight="medium">
        {value}
      </Text>
    </Stack>
  );
}

export default function CheckoutExample() {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState(INITIAL_ITEMS);

  // Cupom
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  // Entrega
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [shipping, setShipping] = useState<Shipping>("pac");
  const [cepLoading, setCepLoading] = useState(false);
  const lookupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (lookupTimer.current) clearTimeout(lookupTimer.current);
  }, []);

  // Pagamento
  const [payment, setPayment] = useState<Payment>("pix");
  const [card, setCard] = useState(EMPTY_CARD);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<{ number: string; total: number; payment: Payment; shipping: Shipping } | null>(null);

  const [errors, setErrors] = useState<Errors>({});

  // ---------- Totais ----------
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const couponDiscount = coupon ? subtotal * COUPON.rate : 0;
  const showShipping = step >= 1;
  const freight = showShipping ? SHIPPING[shipping].price : 0;
  const cardTotal = subtotal - couponDiscount + freight;
  const pixDiscount = step >= 2 && payment === "pix" ? (subtotal - couponDiscount) * PIX_RATE : 0;
  const total = cardTotal - pixDiscount;
  const installments = [1, 2, 3, 4, 5, 6];

  const clearError = (field: string) =>
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });

  // ---------- Carrinho ----------
  const changeQty = (id: number, delta: number) =>
    setItems((list) => list.map((item) => (item.id === id ? { ...item, qty: Math.min(MAX_QTY, Math.max(1, item.qty + delta)) } : item)));

  const removeItem = (item: Item) => {
    setItems((list) => list.filter((i) => i.id !== item.id));
    clearError("carrinho");
    toast("Item removido do carrinho", {
      description: item.name,
      action: { label: "Desfazer", onClick: () => setItems((list) => [...list, item].sort((a, b) => a.id - b.id)) },
    });
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Digite um cupom.");
      return;
    }
    if (code !== COUPON.code) {
      setCouponError("Cupom inválido ou expirado.");
      return;
    }
    setCoupon(code);
    setCouponInput("");
    setCouponError("");
    toast.success("Cupom aplicado", { description: `${code}: 10% de desconto nos produtos.` });
  };

  // ---------- Entrega ----------
  const setAddressField = (field: keyof typeof EMPTY_ADDRESS, value: string) => {
    setAddress((current) => ({ ...current, [field]: value }));
    clearError(field);
  };

  const handleCep = (cep: string) => {
    setAddressField("cep", cep);
    if (lookupTimer.current) clearTimeout(lookupTimer.current);
    if (cep.length !== 8 || cep === address.cep) {
      setCepLoading(false);
      return;
    }
    setCepLoading(true);
    lookupTimer.current = setTimeout(() => {
      const found = FAKE_ADDRESSES[Number(cep[0])];
      setAddress((current) => ({ ...current, ...found }));
      setErrors((current) => {
        const next = { ...current };
        for (const key of ["rua", "bairro", "cidade", "uf"]) delete next[key];
        return next;
      });
      setCepLoading(false);
      toast.success("Endereço encontrado", { description: `${found.rua}, ${found.cidade} - ${found.uf}` });
    }, 900);
  };

  // ---------- Pagamento ----------
  const setCardField = (field: keyof typeof EMPTY_CARD, value: string) => {
    setCard((current) => ({ ...current, [field]: value }));
    clearError(`card.${field}`);
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
      toast.success("Código Pix copiado", { description: "Cole no app do seu banco para pagar." });
    } catch {
      toast.error("Não foi possível copiar", { description: "Selecione o código e copie manualmente." });
    }
  };

  // ---------- Validação por etapa ----------
  const validate = (current: number): Errors => {
    const found: Errors = {};
    if (current === 0 && items.length === 0) found.carrinho = "Adicione pelo menos um item.";
    if (current === 1) {
      if (address.cep.length !== 8) found.cep = "Informe um CEP com 8 dígitos.";
      if (!address.rua.trim()) found.rua = "Informe a rua.";
      if (!address.numero.trim()) found.numero = "Informe o número (ou S/N).";
      if (!address.bairro.trim()) found.bairro = "Informe o bairro.";
      if (!address.cidade.trim()) found.cidade = "Informe a cidade.";
      if (!address.uf) found.uf = "Selecione o estado.";
    }
    if (current === 2 && payment === "cartao") {
      if (card.numero.length !== 16) found["card.numero"] = "O número do cartão tem 16 dígitos.";
      if (card.nome.trim().split(/\s+/).length < 2) found["card.nome"] = "Informe o nome como está no cartão.";
      const month = Number(card.validade.slice(0, 2));
      const year = 2000 + Number(card.validade.slice(2, 4));
      const now = new Date();
      if (card.validade.length !== 4 || month < 1 || month > 12) found["card.validade"] = "Use o formato MM/AA.";
      else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) found["card.validade"] = "Cartão vencido.";
      if (card.cvv.length !== 3) found["card.cvv"] = "O CVV tem 3 dígitos.";
    }
    return found;
  };

  const goNext = async () => {
    const found = validate(step);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error("Confira os campos destacados");
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    setPlacing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPlacing(false);
    setOrder({ number: `AUR-${Math.floor(100000 + Math.random() * 900000)}`, total, payment, shipping });
    setStep(3);
    toast.success("Pedido realizado!");
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  };

  const reset = () => {
    setStep(0);
    setItems(INITIAL_ITEMS);
    setCoupon(null);
    setCouponInput("");
    setCouponError("");
    setAddress(EMPTY_ADDRESS);
    setShipping("pac");
    setPayment("pix");
    setCard(EMPTY_CARD);
    setErrors({});
    setOrder(null);
  };

  const done = step === 3;

  return (
    <Stack padding="lg" gap="lg" background="muted">
      {/* ---------- Cabeçalho da loja ---------- */}
      <Stack direction="row" align="center" justify="between" gap="md" wrap>
        <Stack direction="row" align="center" gap="sm">
          <Stack background="primary" padding="sm" radius="md">
            <Icon icon={ShoppingBag} size="md" />
          </Stack>
          <Stack gap="none">
            <Text variant="h4" as="span">
              Aurora Store
            </Text>
            <Text variant="small" tone="muted" as="span">
              Finalizar compra
            </Text>
          </Stack>
        </Stack>
        <Stack direction="row" align="center" gap="xs">
          <Icon icon={Lock} size="sm" tone="success" />
          <Text variant="small" tone="muted" as="span">
            Ambiente seguro
          </Text>
        </Stack>
      </Stack>

      <Stepper value={STEPS[step].value} onPhsaChange={(e) => setStep(STEPS.findIndex((s) => s.value === detailOf(e)))}>
        {STEPS.map((s, index) => (
          <Step key={s.value} value={s.value} heading={s.heading} description={s.description} disabled={done || index > step} />
        ))}
      </Stepper>

      <Grid columns={2} stackBelow="lg" gap="lg" align="start">
        {/* ---------- Coluna das etapas ---------- */}
        <Stack gap="lg">
          {/* Etapa 1: Carrinho */}
          <Stack gap="lg" hidden={step !== 0}>
            <Card heading="Seu carrinho" description={count ? `${count} ${count === 1 ? "item" : "itens"} · Vendido e entregue por Aurora Store` : undefined}>
              {items.length === 0 ? (
                <EmptyState heading="Seu carrinho está vazio" description="Os itens removidos podem ser restaurados para continuar a demonstração.">
                  <Icon slot="icon" icon={ShoppingCart} size="lg" />
                  <Button slot="actions" type="button" variant="outline" onClick={() => setItems(INITIAL_ITEMS)}>
                    Restaurar carrinho
                  </Button>
                </EmptyState>
              ) : (
                <Stack gap="md">
                  {items.map((item, index) => (
                    <Stack key={item.id} gap="md">
                      {index > 0 && <Separator />}
                      <Stack direction="row" align="start" gap="md">
                        <Stack background="muted" padding="md" radius="md" bordered>
                          <Icon icon={item.icon} size="lg" tone="muted" />
                        </Stack>
                        <Stack gap="sm" grow>
                          <Stack direction="row" justify="between" align="start" gap="md">
                            <Stack gap="none">
                              <Text weight="medium" as="span">
                                {item.name}
                              </Text>
                              <Text variant="small" tone="muted" as="span">
                                {item.variant}
                              </Text>
                              <Text variant="small" tone="muted" as="span">
                                {money(item.price)} cada
                              </Text>
                            </Stack>
                            <Text weight="semibold" as="span">
                              {money(item.price * item.qty)}
                            </Text>
                          </Stack>
                          <Stack direction="row" justify="between" align="center" gap="sm">
                            <Stack direction="row" align="center" gap="sm">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                aria-label={`Diminuir quantidade de ${item.name}`}
                                disabled={item.qty <= 1}
                                onClick={() => changeQty(item.id, -1)}
                              >
                                <Icon icon={Minus} />
                              </Button>
                              <Text weight="medium" as="span">
                                {item.qty}
                              </Text>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                aria-label={`Aumentar quantidade de ${item.name}`}
                                disabled={item.qty >= MAX_QTY}
                                onClick={() => changeQty(item.id, 1)}
                              >
                                <Icon icon={Plus} />
                              </Button>
                            </Stack>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item)}>
                              <Icon icon={Trash} />
                              Remover
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Card>

            {errors.carrinho && <Alert variant="destructive" heading="Carrinho vazio" description={errors.carrinho} />}

            <Card heading="Cupom de desconto" description="Experimente o cupom AURORA10.">
              {coupon ? (
                <Stack direction="row" align="center" justify="between" gap="md" padding="md" radius="md" bordered>
                  <Stack direction="row" align="center" gap="sm">
                    <Icon icon={TicketPercent} tone="success" />
                    <Text weight="medium" as="span">
                      {coupon}
                    </Text>
                    <Badge variant="success">10% off</Badge>
                  </Stack>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setCoupon(null)}>
                    <Icon icon={X} />
                    Remover
                  </Button>
                </Stack>
              ) : (
                <Input
                  label="Código do cupom"
                  placeholder="Ex.: AURORA10"
                  value={couponInput}
                  error={couponError}
                  onInput={(e) => {
                    setCouponInput(valueOf(e));
                    setCouponError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applyCoupon();
                  }}
                >
                  <Icon slot="prefix" icon={TicketPercent} />
                  <Button slot="suffix" type="button" variant="ghost" size="sm" onClick={applyCoupon}>
                    Aplicar
                  </Button>
                </Input>
              )}
            </Card>
          </Stack>

          {/* Etapa 2: Entrega */}
          <Stack gap="lg" hidden={step !== 1}>
            <Card heading="Endereço de entrega" description="Usado também na nota fiscal. Qualquer CEP com 8 dígitos funciona nesta demonstração.">
              <Stack gap="md">
                <Grid columns={2} stackBelow="sm" gap="md">
                  <PatternInput
                    label="CEP"
                    format="#####-###"
                    placeholder="00000-000"
                    value={address.cep}
                    error={errors.cep ?? ""}
                    onInput={(e) => handleCep(valueOf(e))}
                  />
                  {cepLoading && (
                    <Stack direction="row" align="center" gap="sm">
                      <Spinner size="sm" label="Buscando endereço" />
                      <Text variant="small" tone="muted" as="span">
                        Consultando o CEP…
                      </Text>
                    </Stack>
                  )}
                </Grid>
                <Input
                  label="Rua"
                  placeholder="Nome da rua ou avenida"
                  autocomplete="address-line1"
                  value={address.rua}
                  error={errors.rua ?? ""}
                  disabled={cepLoading}
                  onInput={(e) => setAddressField("rua", valueOf(e))}
                >
                  <Icon slot="prefix" icon={MapPin} />
                </Input>
                <Grid columns={2} stackBelow="sm" gap="md">
                  <Input
                    label="Número"
                    placeholder="123"
                    value={address.numero}
                    error={errors.numero ?? ""}
                    onInput={(e) => setAddressField("numero", valueOf(e))}
                  />
                  <Input
                    label="Complemento"
                    placeholder="Apto, bloco (opcional)"
                    value={address.complemento}
                    onInput={(e) => setAddressField("complemento", valueOf(e))}
                  />
                </Grid>
                <Input
                  label="Bairro"
                  value={address.bairro}
                  error={errors.bairro ?? ""}
                  disabled={cepLoading}
                  onInput={(e) => setAddressField("bairro", valueOf(e))}
                />
                <Grid columns={2} stackBelow="sm" gap="md">
                  <Input
                    label="Cidade"
                    value={address.cidade}
                    error={errors.cidade ?? ""}
                    disabled={cepLoading}
                    onInput={(e) => setAddressField("cidade", valueOf(e))}
                  />
                  <Select
                    label="Estado"
                    placeholder="UF"
                    searchable
                    searchPlaceholder="Buscar UF..."
                    value={address.uf}
                    error={errors.uf ?? ""}
                    disabled={cepLoading}
                    onChange={(e) => setAddressField("uf", (e.target as HTMLSelectElement).value)}
                  >
                    {UFS.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </Select>
                </Grid>
              </Stack>
            </Card>

            <Card heading="Forma de entrega" description="O frete é atualizado no resumo.">
              <RadioGroup label="Escolha o frete" value={shipping} onChange={(e) => setShipping(valueOf(e) as Shipping)}>
                {(Object.keys(SHIPPING) as Shipping[]).map((key) => (
                  <Radio key={key} value={key}>
                    {SHIPPING[key].label} · {SHIPPING[key].price ? money(SHIPPING[key].price) : "Grátis"} ({SHIPPING[key].eta})
                  </Radio>
                ))}
              </RadioGroup>
            </Card>
          </Stack>

          {/* Etapa 3: Pagamento */}
          <Stack gap="lg" hidden={step !== 2}>
            <Card heading="Pagamento" description="Escolha como prefere pagar.">
              <Tabs value={payment} onPhsaChange={(e) => {
                setPayment(detailOf(e) as Payment);
                setErrors({});
              }}>
                <Tab slot="tab" value="pix">
                  <Icon icon={QrCode} />
                  Pix
                </Tab>
                <Tab slot="tab" value="cartao">
                  <Icon icon={CreditCard} />
                  Cartão
                </Tab>
                <Tab slot="tab" value="boleto">
                  <Icon icon={Barcode} />
                  Boleto
                </Tab>

                <TabPanel value="pix">
                  <Stack gap="md">
                    <Alert variant="success" heading="5% de desconto no Pix" description="Aprovação na hora: o pedido é liberado assim que o pagamento cai." />
                    <Stack direction="row" align="center" gap="lg" wrap>
                      <Stack padding="lg" radius="lg" bordered align="center" gap="xs">
                        <Icon icon={QrCode} size="xl" />
                        <Text variant="small" tone="muted" as="span">
                          QR Code (demo)
                        </Text>
                      </Stack>
                      <Stack gap="xs" grow>
                        <Text weight="medium" as="span">
                          Total no Pix: {money(cardTotal - (subtotal - couponDiscount) * PIX_RATE)}
                        </Text>
                        <Text variant="small" tone="muted" as="span">
                          O código é gerado ao finalizar e vale por 30 minutos.
                        </Text>
                      </Stack>
                    </Stack>
                    <Input label="Pix copia e cola" value={PIX_CODE} readOnly>
                      <Button slot="suffix" type="button" variant="ghost" size="sm" onClick={copyPix}>
                        <Icon icon={Copy} />
                        Copiar
                      </Button>
                    </Input>
                  </Stack>
                </TabPanel>

                <TabPanel value="cartao">
                  <Stack gap="md">
                    <PatternInput
                      label="Número do cartão"
                      format="#### #### #### ####"
                      placeholder="0000 0000 0000 0000"
                      value={card.numero}
                      error={errors["card.numero"] ?? ""}
                      onInput={(e) => setCardField("numero", valueOf(e))}
                    />
                    <Input
                      label="Nome impresso no cartão"
                      placeholder="MARIA S SILVA"
                      autocomplete="cc-name"
                      value={card.nome}
                      error={errors["card.nome"] ?? ""}
                      onInput={(e) => setCardField("nome", valueOf(e).toUpperCase())}
                    />
                    <Grid columns={2} gap="md">
                      <PatternInput
                        label="Validade"
                        format="##/##"
                        placeholder="MM/AA"
                        value={card.validade}
                        error={errors["card.validade"] ?? ""}
                        onInput={(e) => setCardField("validade", valueOf(e))}
                      />
                      <PatternInput
                        label="CVV"
                        format="###"
                        placeholder="000"
                        description="3 dígitos no verso."
                        value={card.cvv}
                        error={errors["card.cvv"] ?? ""}
                        onInput={(e) => setCardField("cvv", valueOf(e))}
                      />
                    </Grid>
                    <Select label="Parcelas" value={card.parcelas} onChange={(e) => setCardField("parcelas", (e.target as HTMLSelectElement).value)}>
                      {installments.map((n) => (
                        <option key={n} value={String(n)}>
                          {n === 1 ? `À vista · ${money(cardTotal)}` : `${n}x de ${money(cardTotal / n)} sem juros`}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                </TabPanel>

                <TabPanel value="boleto">
                  <Stack gap="md">
                    <Alert
                      variant="info"
                      heading="Vencimento em 3 dias úteis"
                      description="O pedido é confirmado após a compensação, que leva até 2 dias úteis. O boleto chega por e-mail."
                    />
                    <SummaryLine label="Valor do boleto" value={money(cardTotal)} />
                  </Stack>
                </TabPanel>
              </Tabs>
            </Card>
          </Stack>

          {/* Etapa 4: Confirmação */}
          {done && order && (
            <Card>
              <EmptyState
                heading="Pedido confirmado!"
                description="Obrigado pela compra. Enviamos os detalhes para o seu e-mail."
              >
                <Icon slot="icon" icon={CircleCheck} size="xl" tone="success" />
                <Stack gap="sm" align="center">
                  <Badge variant="secondary">Pedido #{order.number}</Badge>
                  <Text tone="muted" align="center">
                    {PAYMENT_LABEL[order.payment]} · {money(order.total)}
                    {order.payment === "cartao" && card.parcelas !== "1" ? ` em ${card.parcelas}x` : ""}
                  </Text>
                  <Text variant="small" tone="muted" align="center">
                    {order.payment === "pix"
                      ? "Pague o Pix em até 30 minutos para liberar o envio."
                      : order.payment === "boleto"
                        ? "O boleto vence em 3 dias úteis."
                        : "Pagamento aprovado."}{" "}
                    {order.shipping === "retirada" ? "Retire na Loja Aurora Centro." : `Entrega ${SHIPPING[order.shipping].label}: ${SHIPPING[order.shipping].eta}.`}
                  </Text>
                </Stack>
                <Button slot="actions" type="button" onClick={reset}>
                  <Icon icon={ShoppingBag} />
                  Novo pedido
                </Button>
                <Button slot="actions" type="button" variant="outline" onClick={() => toast("Acompanhamento do pedido (demo)")}>
                  <Icon icon={Truck} />
                  Acompanhar pedido
                </Button>
              </EmptyState>
            </Card>
          )}

          {/* Navegação */}
          {!done && (
            <Stack direction="row" justify="between" gap="sm">
              {step === 0 ? (
                <Button type="button" variant="ghost" onClick={() => toast("Voltando para a vitrine (demo)")}>
                  <Icon icon={ArrowLeft} />
                  Continuar comprando
                </Button>
              ) : (
                <Button type="button" variant="outline" disabled={placing} onClick={goBack}>
                  <Icon icon={ArrowLeft} />
                  Voltar
                </Button>
              )}
              <Button type="button" size="lg" loading={placing} loadingLabel="Processando pagamento" disabled={items.length === 0} onClick={goNext}>
                {step === 2 ? (
                  placing ? "Processando…" : `Pagar ${money(total)}`
                ) : (
                  <>
                    Continuar
                    <Icon icon={ArrowRight} />
                  </>
                )}
              </Button>
            </Stack>
          )}
        </Stack>

        {/* ---------- Resumo do pedido ---------- */}
        <Card heading="Resumo do pedido" description={`${count} ${count === 1 ? "item" : "itens"}`}>
          <Stack gap="md">
            {items.length > 0 && (
              <Stack gap="sm">
                {items.map((item) => (
                  <Stack key={item.id} direction="row" justify="between" align="center" gap="md">
                    <Stack direction="row" align="center" gap="sm">
                      <Icon icon={item.icon} tone="muted" />
                      <Text variant="small" as="span">
                        {item.qty}× {item.name}
                      </Text>
                    </Stack>
                    <Text variant="small" as="span">
                      {money(item.price * item.qty)}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            )}

            <Separator />

            <Stack gap="xs">
              <SummaryLine label="Subtotal" value={money(subtotal)} />
              <SummaryLine
                label={showShipping ? `Frete (${SHIPPING[shipping].label})` : "Frete"}
                value={showShipping ? (freight ? money(freight) : "Grátis") : "Calculado na entrega"}
                tone={showShipping && !freight ? "success" : showShipping ? undefined : "muted"}
              />
              {coupon && <SummaryLine label={`Cupom ${coupon}`} value={`− ${money(couponDiscount)}`} tone="success" />}
              {pixDiscount > 0 && <SummaryLine label="Desconto Pix (5%)" value={`− ${money(pixDiscount)}`} tone="success" />}
            </Stack>

            <Separator />

            <Stack direction="row" justify="between" align="baseline" gap="md">
              <Text variant="h4" as="span">
                Total
              </Text>
              <Text variant="h3" as="span">
                {money(done && order ? order.total : total)}
              </Text>
            </Stack>
            {!done && (
              <Text variant="small" tone="muted" align="end">
                ou em até 6x de {money(cardTotal / 6)} sem juros no cartão
              </Text>
            )}

            {step >= 2 && address.cidade && (
              <Stack direction="row" align="start" gap="sm" padding="sm" radius="md" bordered>
                <Icon icon={shipping === "retirada" ? ShoppingBag : Truck} tone="muted" />
                <Stack gap="none">
                  <Text variant="small" weight="medium" as="span">
                    {SHIPPING[shipping].label} · {SHIPPING[shipping].eta}
                  </Text>
                  <Text variant="small" tone="muted" as="span">
                    {address.rua}, {address.numero}
                    {address.complemento ? ` · ${address.complemento}` : ""} · {address.cidade} - {address.uf}
                  </Text>
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack slot="footer" direction="row" align="center" gap="xs" grow>
            <Icon icon={ShieldCheck} tone="success" />
            <Text variant="small" tone="muted" as="span">
              Compra protegida · Troca grátis em 30 dias
            </Text>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  );
}
