import { Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  console.log("theme: ", theme);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="theme-switch" className="text-black dark:text-white">
            Tema
          </Label>
          <p className="text-sm text-muted-foreground">
            Cambiar entre modo claro y oscuro
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="h-4 w-4 text-black dark:text-white" />
          <Switch
            id="theme-switch"
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
          <Moon className="h-4 w-4 text-black dark:text-white" />
        </div>
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-black dark:text-white">Cuenta</Label>
          <p className="text-sm text-muted-foreground">
            Cerrar sesión de tu cuenta
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          aria-label="Cerrar sesión">
          <LogOut className="h-5 w-5 text-black dark:text-white" />
        </Button>
      </div>
    </div>
  );
}
