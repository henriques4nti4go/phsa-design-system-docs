/**
 * @title Até o conteúdo chegar
 * @description Mostre o skeleton no lugar exato do conteúdo e troque quando os dados carregarem.
 */
"use client";

import { useEffect, useState } from "react";
import { Avatar, Button, Skeleton, Stack, Text } from "@phsa.tec/design-system-react/react";

export default function SkeletonLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Stack maxWidth="sm" gap="md">
      <Stack direction="row" gap="md" align="center" aria-busy={loading}>
        {loading ? (
          <>
            <Skeleton variant="circular" />
            <Stack gap="sm" grow>
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </Stack>
          </>
        ) : (
          <>
            <Avatar src="https://i.pravatar.cc/120?img=47" alt="Camila Ribeiro" />
            <Stack gap="none">
              <Text weight="medium">Camila Ribeiro</Text>
              <Text variant="small" tone="muted">Gerente de contas · Recife</Text>
            </Stack>
          </>
        )}
      </Stack>
      <Button variant="outline" disabled={loading} onClick={() => setLoading(true)}>
        Recarregar
      </Button>
    </Stack>
  );
}
