/**
 * @title Carregando
 * @description `loading` mostra um spinner e bloqueia o clique; `loading-label` é o texto lido pelos leitores de tela.
 */
"use client";

import { useState } from "react";
import { Button } from "@phsa.tec/design-system-react/react";

export default function ButtonLoading() {
  const [loading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Button loading={loading} loadingLabel="Salvando" onClick={save}>
      {loading ? "Salvando…" : "Salvar"}
    </Button>
  );
}
