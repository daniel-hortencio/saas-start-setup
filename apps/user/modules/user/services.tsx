import { apiFetch } from "../../shared/api/apiFetch";
import { UserCreateType } from "./types";

const USER_SERVICES_PATH = `${process.env.NEXT_PUBLIC_APP_URL}/api/bff/users`;

export const userServices = {
  create: (dto: UserCreateType) => apiFetch.post(USER_SERVICES_PATH, dto),
};
