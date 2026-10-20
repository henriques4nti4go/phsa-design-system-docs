/**
 * @title Controlado
 * @description `clearable` permite zerar a nota clicando de novo na estrela escolhida.
 */
"use client";

import { useState } from "react";
import { Rating, Stack, Text } from "@phsa.tec/design-system-react/react";

const labels = ["Sem avaliação", "Péssimo", "Ruim", "Regular", "Bom", "Excelente"];

export default function RatingControlled() {
  const [score, setScore] = useState("3");

  return (
    <Stack maxWidth="sm" gap="sm">
      <Rating
        label="Avalie o produto"
        clearable
        value={score}
        onChange={(e) => setScore((e.target as HTMLInputElement).value)}
      />
      <Text variant="small" tone="muted">
        {labels[Number(score)]} ({score}/5)
      </Text>
    </Stack>
  );
}
