"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  InputPassword,
  InputText,
  useToast,
} from "@repo/ui/components";
import { signIn } from "next-auth/react";
import { UserSignInSchema, UserSignInType } from "../../user/schemas";

export const FormSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignInType>({ resolver: zodResolver(UserSignInSchema) });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<UserSignInType> = async (data) => {
    try {
      const result_sing_in = await signIn("credentials", {
        redirect: Boolean(false),
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });

      if (result_sing_in?.error === "CredentialsSignin") {
        toast({
          variant: "destructive",
          title: "Erro 1",
        });
        return;
      }
    } catch (errorMessage) {
      toast({
        variant: "destructive",
        title: "Erro 2",
      });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <InputText
          {...register("email")}
          id="email"
          error={errors.email?.message}
          label="Email"
          placeholder="Insira seu email"
        />
        <InputPassword
          label="Password"
          {...register("password")}
          id="password"
          error={errors.password?.message}
          placeholder="Insira sua senha"
        />
      </div>
      <Button className="w-full" type="submit">
        SignIn
      </Button>
    </form>
  );
};
