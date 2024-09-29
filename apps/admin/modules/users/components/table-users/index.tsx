"use client";
import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnsDesktop, columnsMobile } from "./columns-definitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components";
import { UserType } from "../../types";

export function TableUsers({ data }: { data: UserType[] }) {
  const tableMobile = useReactTable({
    data,
    columns: columnsMobile,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableDesktop = useReactTable({
    data,
    columns: columnsDesktop,
    getCoreRowModel: getCoreRowModel(),
  });

  function TableMobile() {
    return (
      <TableBody className="lg:hidden">
        {tableMobile?.getRowModel().rows?.length &&
          tableMobile.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
      </TableBody>
    );
  }

  const TABLE_GRID_COLS = "grid-cols-3";

  function TableDesktop() {
    return (
      <>
        <TableHeader className="hidden lg:block">
          <TableRow className={`grid gap-5 ${TABLE_GRID_COLS}`}>
            {["Name", "Email", "Roles"].map((th) => (
              <TableHead key={th}>{th}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="hidden lg:block">
          {tableDesktop?.getRowModel().rows?.length &&
            tableDesktop.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={`grid gap-5 ${TABLE_GRID_COLS}`}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </>
    );
  }

  return (
    <Table className="bg-white">
      <TableMobile />
      <TableDesktop />
    </Table>
  );
}
