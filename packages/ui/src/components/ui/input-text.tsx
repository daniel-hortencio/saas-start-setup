import { InputBase, InputProps } from "@ui/components/ui/input-base";
import { Label } from "@ui/components/ui/label";
import { forwardRef } from "react";

const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, name, error, ...props }, ref) => {
    return (
      <div {...{ className }}>
        <div className="space-y-1">
          <Label htmlFor={name}>{label}</Label>
          <InputBase {...{ ...props, ref, name, type: "text" }} />
        </div>
        <span className="text-sm text-red-500">{error}</span>
      </div>
    );
  },
);
InputText.displayName = "InputText";

export { InputText };
