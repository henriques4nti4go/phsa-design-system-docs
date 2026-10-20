/**
 * @title Básico
 * @description Sozinho, o `Toggle` alterna `pressed` a cada clique e avisa em `onPhsaChange` com `detail.pressed`.
 */
"use client";

import { useState } from "react";
import { Icon, Toggle } from "@phsa.tec/design-system-react/react";
import { Heart } from "@phsa.tec/design-system-react/icons/heart";

export default function ToggleBasic() {
  const [favorite, setFavorite] = useState(false);

  return (
    <Toggle
      variant="outline"
      pressed={favorite}
      onPhsaChange={(event) => setFavorite((event as CustomEvent<{ pressed: boolean }>).detail.pressed)}
    >
      <Icon icon={Heart} tone={favorite ? "destructive" : "inherit"} />
      {favorite ? "Favoritado" : "Favoritar"}
    </Toggle>
  );
}
