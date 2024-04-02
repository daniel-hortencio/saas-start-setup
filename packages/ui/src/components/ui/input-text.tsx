import { InputBase, InputProps } from "@ui/components/ui/input-base";
import { Label } from "@ui/components/ui/label";

export function InputText({ label, name, placeholder, className }: InputProps) {
  return (
    <div {...{ className }}>
      <Label htmlFor={name}>{label}</Label>
      <InputBase {...{ name, placeholder, type: "text" }} />
    </div>
  );
}
