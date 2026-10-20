/**
 * @title Colunas
 * @description `columns` define quantas colunas iguais a grade tem (1 a 6, ou 12).
 */
"use client";

import { Grid, Stack } from "@phsa.tec/design-system-react/react";

const items = ["1", "2", "3", "4", "5", "6"];

export default function GridColumns() {
  return (
    <Stack maxWidth="2xl">
      <Grid columns={3} gap="md">
        {items.map((item) => (
          <Stack key={item} background="muted" padding="md" radius="md" align="center">
            {item}
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
}
