import { apiFetch } from "../../shared/api/apiFetch";
import { UserCreateType } from "./types";

export const userServices = {
  create: (dto: UserCreateType) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await apiFetch({
          url: "/users",
          method: "POST",
          body: dto,
        });

        if (response.isError) {
          const { message } = response;
          reject({ message });
        } else {
          resolve(response.data);
        }
      } catch (error: any) {
        reject(new Error(error));
      }
    }),
};
