import { Category } from "@repo/database";
import { apiBFF } from "../../../shared/api/apiFetch";

export const categoriesServices = {
  getAll: () =>
    apiBFF<Category[]>({
      url: "/categories",
      method: "GET",
    }),
};
