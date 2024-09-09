import { z } from "zod";

export const UserCreateSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).max(36),
    password_confirmation: z.string().min(6).max(36),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export type UserCreateType = z.infer<typeof UserCreateSchema>;

export const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(36),
});

export type UserSignInType = z.infer<typeof UserSignInSchema>;
