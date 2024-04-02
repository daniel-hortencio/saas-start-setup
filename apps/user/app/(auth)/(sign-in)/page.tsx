"use client";

import { Button, InputPassword, InputText } from "@repo/ui/components";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="w-full">
      <InputText
        name="email"
        label="Email"
        placeholder="Insira seu email"
        className="mb-2"
      />
      <InputPassword
        label="Password"
        name="password"
        placeholder="Insira sua senha"
        className="mb-4"
      />
      <Button className="w-full">SignIn</Button>
    </div>
  );
}
