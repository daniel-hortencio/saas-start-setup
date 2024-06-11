import { SubmitHandler, useForm } from "react-hook-form";
import { UserSignInSchema, UserSignInType } from "../user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  InputPassword,
  InputText,
  useToast,
} from "@repo/ui/components";
import { signIn } from "next-auth/react";

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

      console.log({ result_sing_in });

      if (result_sing_in?.error === "CredentialsSignin") {
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
};
