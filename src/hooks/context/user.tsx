/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { fetchGetMe } from "@/api/endpoints/user";
import { getLSToken } from "@/lib/localStorage";
import { User } from "@/lib/types/models";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
interface UserContextProps {
  user: User;
  isLoading: boolean;
  mutateUser: any;
}

const UserContext = createContext<UserContextProps>({
  user: {} as User,
  isLoading: true,
  mutateUser: async () => {},
});

export const UserProvider = ({ children }: any) => {
  const isAuth = !!getLSToken();

  const { data, error, mutate } = useSWR<User>(
    isAuth ? "/api/user/me" : null,
    fetchGetMe,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  const isLoading = !data && !error;
  const user = data as User;
  async function mutateUser() {
    console.log("MUTATE");
    await mutate(undefined, { revalidate: true });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        mutateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
