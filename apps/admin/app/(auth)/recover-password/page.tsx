"use client";

import { Button, InputText } from "@repo/ui/components";
import Link from "next/link";

export default function RecoverPassword() {
  return (
    <div className="w-full">
      <InputText name="email" label="Email" placeholder="Insira seu email" />
      <Button className="w-full">Send</Button>
    </div>
  );
}
