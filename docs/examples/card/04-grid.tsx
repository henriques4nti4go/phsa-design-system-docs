/**
 * @title Em grade
 * @description Num `Grid`, os cards formam um painel; `stackBelow="md"` empilha as colunas no celular.
 */
"use client";

import { Card, Grid, Stack, Text } from "@phsa.tec/design-system-react/react";

const metrics = [
  { label: "Receita do mês", value: "R$ 48.230", change: "+12% em relação a setembro", tone: "success" },
  { label: "Pedidos", value: "1.284", change: "+4% em relação a setembro", tone: "success" },
  { label: "Cancelamentos", value: "37", change: "+9 em relação a setembro", tone: "destructive" },
] as const;

export default function CardGrid() {
  return (
    <Stack maxWidth="4xl">
      <Grid columns={3} gap="md" stackBelow="md">
        {metrics.map((metric) => (
          <Card key={metric.label} description={metric.label}>
            <Text variant="h2">{metric.value}</Text>
            <Text variant="small" tone={metric.tone}>
              {metric.change}
            </Text>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}
