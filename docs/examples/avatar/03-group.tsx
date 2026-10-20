/**
 * @title Grupo
 * @description `AvatarGroup` sobrepõe os avatares e mostra até `max`; o restante vira um contador `+N`.
 */
"use client";

import { Avatar, AvatarGroup, Stack, Text } from "@phsa.tec/design-system-react/react";

const team = [
  { name: "Fernanda Lima", photo: "https://i.pravatar.cc/120?img=5" },
  { name: "Thiago Rocha", photo: "https://i.pravatar.cc/120?img=12" },
  { name: "Larissa Mendes", photo: "https://i.pravatar.cc/120?img=32" },
  { name: "Bruno Carvalho", photo: "https://i.pravatar.cc/120?img=53" },
  { name: "Patrícia Gomes", photo: "https://i.pravatar.cc/120?img=44" },
  { name: "Diego Nunes", photo: "https://i.pravatar.cc/120?img=68" },
];

export default function AvatarGroupExample() {
  return (
    <Stack gap="sm" align="center">
      <AvatarGroup max={4}>
        {team.map((person) => (
          <Avatar key={person.name} src={person.photo} alt={person.name} />
        ))}
      </AvatarGroup>
      <Text variant="small" tone="muted">
        {team.length} pessoas no projeto
      </Text>
    </Stack>
  );
}
