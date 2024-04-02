"use client";

import { Button, Icon, Card } from "@repo/ui/components";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";

const Category = ({ icon, color, name, type, className }: any) => {
  return (
    <div className={cn("flex items-center justify-between py-2 ", className)}>
      <div className="rounded-full p-2" style={{ backgroundColor: color }}>
        <Icon name={icon} size={24} color="white" />
      </div>
      <p className="ml-4">{name}</p>
      <span className="ml-4 border rounded-full px-2 block text-sm">
        {type === "income" ? "Receita" : "Despesa"}
      </span>
      <Button
        className="ml-auto aspect-square p-0 rounded-sm"
        variant="outline"
      >
        <Icon name="DotsThreeVertical" />
      </Button>
    </div>
  );
};

export default function DashboardCategories() {
  const [filterBy, setFilterBy] = useState("");

  const list = [
    { icon: "AddressBook", name: "Salário", color: "blue", type: "income" },
    { icon: "AddressBook", name: "Alimentação", color: "red", type: "expanse" },
  ];

  return (
    <div className="mx-auto w-full max-w-xl">
      <header className="flex items-center justify-between mb-5">
        <h1 className="text-xl ">Categorias</h1>
        <Button className="ml-auto flex items-center">
          <Icon name="PlusCircle" color="white" />
          <span className="ml-2">Nova categoria</span>
        </Button>
      </header>

      <Card className="p-4 mb-5">
        <div className="flex items-center">
          <p>Filtrar por:</p>
          <Button
            onClick={() => setFilterBy("")}
            variant={filterBy === "" ? "default" : "outline"}
            className="ml-2"
          >
            Todas
          </Button>
          <Button
            onClick={() => setFilterBy("income")}
            variant={filterBy === "income" ? "default" : "outline"}
            className="ml-2"
          >
            Receitas
          </Button>
          <Button
            onClick={() => setFilterBy("expanse")}
            variant={filterBy === "expanse" ? "default" : "outline"}
            className="ml-2"
          >
            Despesas
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        {list
          .filter((category) => {
            if (filterBy === "" || filterBy === category.type) return category;
          })
          .map((category, index) => (
            <Category
              key={category.name}
              {...category}
              className={index > 0 && "border-t-[1px]"}
            />
          ))}
      </Card>
    </div>
  );
}
