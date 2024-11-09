import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
export default function Header() {
  return (
    <div className="container mx-auto">
      <header className="flex h-20 w-full shrink-0 items-center text-gray-500 px-4 md:px-6">
        <Avatar>
          <AvatarFallback>MT</AvatarFallback>
        </Avatar>
        <p className="ml-5">Bottom - Guemes</p>
        <div className="ml-auto flex gap-2">
          <LogOut />
        </div>
      </header>
    </div>
  );
}
