"use client";

import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { InputBase, InputProps } from "@ui/components/ui/input-base";
import { Label } from "./label";

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, name, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div {...{ className }}>
        <Label htmlFor={name}>{label}</Label>

        <div className="relative w-full">
          <InputBase
            type={showPassword ? "text" : "password"}
            className="hide-password-toggle pr-10"
            ref={ref}
            {...{ ...props, name }}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>

          <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
        </div>
        <span className="text-sm text-red-500">{error}</span>
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
