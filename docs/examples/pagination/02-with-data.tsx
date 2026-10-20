/**
 * @title Paginando uma lista
 * @description A paginação só navega; quem fatia os dados é a página, a partir do `page` atual.
 */
"use client";

import { useState } from "react";
import { Pagination, Stack, Text } from "@phsa.tec/design-system-react/react";

const cities = [
  "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte",
  "Manaus", "Curitiba", "Recife", "Goiânia", "Belém", "Porto Alegre", "Guarulhos",
  "Campinas", "São Luís", "Maceió", "Campo Grande", "Teresina", "João Pessoa", "Natal",
];

const PAGE_SIZE = 5;

export default function PaginationWithData() {
  const [page, setPage] = useState(1);
  const visible = cities.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Stack gap="md" maxWidth="xs">
      <Stack gap="xs">
        {visible.map((city, index) => (
          <Text key={city}>
            {(page - 1) * PAGE_SIZE + index + 1}. {city}
          </Text>
        ))}
      </Stack>
      <Stack align="center">
        <Pagination
          page={page}
          pageCount={Math.ceil(cities.length / PAGE_SIZE)}
          label="Paginação das cidades"
          onPhsaChange={(event) => setPage((event as CustomEvent<{ page: number }>).detail.page)}
        />
      </Stack>
    </Stack>
  );
}
