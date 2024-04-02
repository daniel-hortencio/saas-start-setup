"use client";

import { Button, InputPassword, InputText } from "@repo/ui/components";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="w-full">
      <InputText name="name" label="Nome" placeholder="Insira seu Nome" />
      <InputText name="email" label="Email" placeholder="Insira seu email" />
      <InputPassword
        label="Password"
        name="password"
        placeholder="Insira sua senha"
      />
      <InputPassword
        label="Password"
        name="password-confirmation"
        placeholder="Confirme sua senha"
      />
      <Button className="w-full">SignUp</Button>
    </div>
  );
}
