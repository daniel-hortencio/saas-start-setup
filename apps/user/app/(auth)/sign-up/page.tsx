"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  InputPassword,
  InputText,
  ToastAction,
  useToast,
} from "@repo/ui/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { userServices } from "../../../modules/user/services";
import { UserCreateSchema, UserCreateType } from "../../../modules/user/types";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateType>({ resolver: zodResolver(UserCreateSchema) });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<UserCreateType> = async (data) => {
    await userServices
      .create(data)
      .then(() => {
        toast({
          title: `Usuário criado com sucesso!`,
        });
      })
      .catch((err) => {
        toast({
          title: `Não foi possível cadastrar!`,
          description: err.message,
          variant: "destructive",
        });
      });
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <InputText
        {...register("name")}
        error={errors.name?.message}
        label="Nome"
        placeholder="Insira seu Nome"
      />
      <InputText
        {...register("email")}
        error={errors.email?.message}
        label="Email"
        placeholder="Insira seu email"
      />
      <InputPassword
        label="Password"
        {...register("password")}
        error={errors.password?.message}
        placeholder="Insira sua senha"
      />
      <InputPassword
        label="Password Confirmation"
        error={errors.password_confirmation?.message}
        {...register("password_confirmation")}
        placeholder="Confirme sua senha"
      />
      <Button className="w-full">SignUp</Button>
    </form>
  );
}
