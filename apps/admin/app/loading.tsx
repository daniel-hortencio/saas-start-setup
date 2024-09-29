import { Spinner } from "@repo/ui/components";
import "@repo/ui/globals.css";

export default function Loading() {
  return (
    <div className="bg-foreground w-screen h-screen flex items-center justify-center">
      <Spinner.BeatLoader color="white" />
    </div>
  );
}
