import { Loader2 } from "lucide-react";

export default function FallbackComponent() {
  return (
    <div className="min-h-[calc(100vh-50px)] flex justify-center">
      <Loader2 className="animate-spin w-full m-auto"></Loader2>
    </div>
  );
}
