"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch, useFetch } from "../../../shared/api/apiFetch";
import { TableUsers } from "../components/table-users";

export const UsersList = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, isOk } = await useFetch({
        path: "http://localhost:3333/admin/users",
        method: "GET",
      });

      return data;
    },
  });

  return <TableUsers {...{ data }} />;
};
