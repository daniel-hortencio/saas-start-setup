import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "../../types";

export const columnsMobile: ColumnDef<UserType>[] = [
  {
    id: "id",
    cell: ({ row }) => (
      <div className="p-4 font-medium flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-zinc-500 text-sm">Nome:</span>
          <span> {row.original.name}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-zinc-500">Email:</span>
          <span> {row.original.email}</span>
        </div>
      </div>
    ),
  },
];

export const columnsDesktop: ColumnDef<UserType>[] = [
  {
    id: "name",
    cell: ({ row }) => <p> {row.original.name}</p>,
  },
  {
    id: "email",
    cell: ({ row }) => <p> {row.original.email}</p>,
  },
  {
    id: "role",
    cell: ({ row }) => (
      <p className="flex">
        {row.original.roles.some((role) => role === "ADMIN") && (
          <span className="bg-foreground text-background text-xs px-1 py-0.5 rounded-sm">
            ADMIN
          </span>
        )}
      </p>
    ),
  },
];
