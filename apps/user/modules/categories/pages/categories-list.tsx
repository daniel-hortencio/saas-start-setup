import { Button, Card, Icon } from "@repo/ui/components";
import { CardCategory } from "../components/card-category";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoriesServices } from "../services";
import { Category } from "@repo/database";

export const CategoriesList = () => {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data: categories } = await categoriesServices.getAll();

      return categories;
    },
  });

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
            onClick={() => setFilterBy("REVENUE")}
            variant={filterBy === "REVENUE" ? "default" : "outline"}
            className="ml-2"
          >
            Receitas
          </Button>
          <Button
            onClick={() => setFilterBy("EXPENSE")}
            variant={filterBy === "EXPENSE" ? "default" : "outline"}
            className="ml-2"
          >
            Despesas
          </Button>
        </div>
      </Card>

      <Card className="p-4">
        {categories &&
          categories
            .filter((category) => {
              if (filterBy === "" || filterBy === category.type)
                return category;
            })
            .map((category, index) => (
              <CardCategory
                key={category.id}
                {...category}
                className={index > 0 && "border-t-[1px]"}
              />
            ))}
      </Card>
    </div>
  );
};
