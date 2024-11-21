/* eslint-disable @typescript-eslint/no-explicit-any */
export default function toastError(toast: any, message: string) {
  toast({
    variant: "destructive",
    title: message,
  });
}
