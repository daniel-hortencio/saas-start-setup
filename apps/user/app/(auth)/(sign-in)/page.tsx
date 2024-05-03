"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  InputPassword,
  InputText,
  useToast,
} from "@repo/ui/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserSignInSchema, UserSignInType } from "../../../modules/user/types";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInType>({ resolver: zodResolver(UserSignInSchema) });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<UserSignInType> = async (data) => {
    console.log({ data });
    try {
      const resultSingIn = await signIn("credentials", {
        redirect: Boolean(false),
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (resultSingIn?.error === "CredentialsSignin") {
        toast({
          title: "Erro 1",
        });
        return;
      }
    } catch (errorMessage) {
      toast({
        title: "Erro 2",
      });
    }
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
      <Button className="w-full" type="submit">
        SignIn
      </Button>
    </form>
  );
}
