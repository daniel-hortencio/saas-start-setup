"use client";

import { Button, Icon, Card } from "@repo/ui/components";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";

const Transaction = ({ icon, color, name, type, className }: any) => {
  return (
    <div
      className={cn(
        "flex items-center bg-white justify-between py-2",
        className,
      )}
    >
      <Icon name={icon} size={28} color={color} />
      <div className="ml-4">
        <p>{name}</p>
        <p className="text-sm opacity-70">25 de março</p>
      </div>

      <p className="ml-auto">R$ 534,87</p>
      <div
        className={cn(
          "ml-2",
          type === "income" ? "fill-green-500" : "opacity-20",
        )}
      >
        <Icon name={type === "income" ? "ArrowUp" : "ArrowDown"} size={20} />
      </div>

      <Button className="ml-2 aspect-square p-0 rounded-sm" variant="outline">
        <Icon name="DotsThreeVertical" />
      </Button>
    </div>
  );
};

export default function DashboardTransactions() {
  const [filterBy, setFilterBy] = useState("");

  const list = [
    { icon: "AddressBook", name: "Salário", color: "blue", type: "income" },
    {
      icon: "AddressBook",
      name: "Supermercado",
      color: "red",
      type: "expanse",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-xl">
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-xl">Transactions</h1>
        <Button className="ml-auto flex items-center">
          <Icon name="PlusCircle" color="white" />
          <span className="ml-2">Nova transação</span>
        </Button>
      </header>

      <p className="ml-4">Março, 2024</p>
      <Card className="px-4">
        {list
          .filter((transaction) => {
            if (filterBy === "" || filterBy === transaction.type)
              return transaction;
          })
          .map((transaction, index) => (
            <Transaction
              key={transaction.name}
              {...transaction}
              className={index > 0 && "border-t-[1px]"}
            />
          ))}
      </Card>
    </div>
  );
}
