/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetchGetMe } from "@/api/endpoints/user";
import { User } from "@/lib/types/models";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import useSWR from "swr";
interface UserContextProps {
  user: User;
  isLoading: boolean;
  mutateUser: any;
  resetUser: any;
}

const UserContext = createContext<UserContextProps>({
  user: {} as User,
  isLoading: true,
  mutateUser: async () => {},
  resetUser: async () => {},
});

export const UserProvider = ({ children }: any) => {
  const { push } = useRouter();

  const { data, mutate, isLoading } = useSWR<User>("/api/user/me", fetchGetMe, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    onSuccess: (result) => {
      if (!result) {
        push("/logIn");
      }
    },
  });

  const user = data as User;
  async function resetUser() {
    await mutate(undefined, false);
  }
  async function mutateUser() {
    await mutate(undefined, { revalidate: true });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        mutateUser,
        resetUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
