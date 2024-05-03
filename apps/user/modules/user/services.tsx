import { apiFetch } from "../../shared/apiFetch";

export const userServices = {
  create: (dto) =>
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
      } catch (error) {
        reject(new Error(error));
      }
    }),
};
