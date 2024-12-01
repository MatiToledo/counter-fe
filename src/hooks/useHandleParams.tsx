import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useHandleParams() {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key); // Eliminar el parámetro si el valor es null
        } else {
          newParams.set(key, value); // Establecer el parámetro
        }
      });
      return newParams.toString();
    },
    [searchParams]
  );

  function updateParam(param: string, value: string) {
    push(pathname + "?" + createQueryString({ [param]: value }));
  }

  function removeParam(param: string) {
    push(pathname + "?" + createQueryString({ [param]: null }));
  }

  return { updateParam, removeParam };
}
