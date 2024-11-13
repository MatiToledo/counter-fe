/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetchGetMe } from "@/api/endpoints/user";
import { User } from "@/lib/types/models";
import { createContext, useContext } from "react";
import useSWR from "swr";
interface UserContextProps {
  user: User;
  loading: boolean;
  mutateUser: any;
}

const UserContext = createContext<UserContextProps>({
  user: {} as User,
  loading: true,
  mutateUser: async () => {},
});

export const UserProvider = ({ children }: any) => {
  const { data, error, mutate } = useSWR<User>("/api/user/me", fetchGetMe, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const loading = !data && !error;
  const user = data as User;
  const mutateUser = () => mutate(undefined, { revalidate: true });

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        mutateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
