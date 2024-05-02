import { apiFetch } from "../../app/shared/apiFetch";

export const userServices = {
  create: (dto) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await apiFetch({
          url: "/user",
          method: "POST",
          body: dto,
        });

        if (response.isError) {
          reject(response.message);
        } else {
          resolve(response.data);
        }
      } catch (error) {
        reject(new Error(error.message));
      }
    }),
};
