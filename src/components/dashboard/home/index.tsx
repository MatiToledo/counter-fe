import { useUser } from "@/hooks/context/user";

export default function DashboardHomeComponent() {
  const user = useUser();
  console.log("user: ", user);
  return <div className="h-screen w-full p-4">Dashboard</div>;
}
