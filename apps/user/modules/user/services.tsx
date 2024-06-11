import { apiBFF } from "../../shared/api/apiFetch";
import { UserCreateType } from "./types";

export const userServices = {
  create: (dto: UserCreateType) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await apiBFF({
          url: "/users",
          method: "POST",
          body: dto,
        }).then((res) => {
          console.log("Chegou aqui");
          console.log({ res });
        });

        console.log({ response });

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
