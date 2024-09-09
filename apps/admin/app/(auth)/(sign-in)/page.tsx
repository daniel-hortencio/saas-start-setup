import { FormSignIn } from "../../../modules/auth/pages/form-sign-in";

export default function SignIn() {
  return (
    <div className="space-y-5 w-full max-w-96">
      <h1 className="text-xl font-semibold">SignIn</h1>
      <FormSignIn />
    </div>
  );
}
