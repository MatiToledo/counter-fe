import { useToast } from "@/hooks/use-toast";
import useChat from "@/hooks/useChat";
import { UUID } from "crypto";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MessageComponent from "./message";
import { ToastAction } from "../../ui/toast";

type MessagesChatProps = {
  BranchId: UUID;
  UserId: UUID;
};

export default function MessagesChat({ BranchId, UserId }: MessagesChatProps) {
  const container = useRef() as React.MutableRefObject<HTMLDivElement>;
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { toast, dismiss } = useToast();
  const [previousScrollHeight, setPreviousScrollHeight] = useState(0);
  const {
    messages,
    isLoadingMore,
    loadMore,
    setPage,
    haveNextPage,
    haveNewMessage,
    setHaveNewMessage,
  } = useChat(BranchId, UserId);

  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    setPage(1);
    setPreviousScrollHeight(0);
    scrollToBottom();
  }, [BranchId]);

  const scrollToBottom = () => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  };

  async function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = container.current;

    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if (isAtTop && haveNextPage) {
      await loadMore();
    }

    if (isAtBottom) {
      setHaveNewMessage(false);
      dismiss();
    }
  }

  useEffect(() => {
    if (container.current) {
      const scrollHeightDifference =
        container.current.scrollHeight - previousScrollHeight;

      // Verificar si estamos al fondo
      const isAtBottom =
        container.current.scrollTop + container.current.clientHeight >=
        container.current.scrollHeight - 1;

      // Comprobar si el último mensaje es visible
      if (haveNewMessage && lastMessageRef.current) {
        const lastMessageRect = lastMessageRef.current.getBoundingClientRect();
        const containerRect = container.current.getBoundingClientRect();

        // Verificar si el último mensaje está fuera de la vista
        if (
          lastMessageRect.bottom > containerRect.bottom ||
          lastMessageRect.top < containerRect.top
        ) {
          toast({
            title: "Nuevo mensaje",
            description: "Tienes un nuevo mensaje.",
            action: (
              <ToastAction altText="Ver" onClick={() => scrollToBottom()}>
                Ver
              </ToastAction>
            ),
          });
        }
      }

      // Actualizar altura previa
      setPreviousScrollHeight(container.current.scrollHeight);

      // Si estamos al fondo, desplazamos hacia abajo
      if (isAtBottom) {
        scrollToBottom();
      } else {
        // Si no estamos al fondo, ajustamos el scroll manteniendo la posición relativa
        container.current.scrollTop += scrollHeightDifference;
      }
    }
  }, [messages, haveNewMessage]);

  return (
    <div
      ref={container}
      onScroll={handleScroll}
      className="flex-1 p-4 space-y-4 max-h-[calc(100vh-188px)] min-h-[calc(100vh-188px)] overflow-y-auto">
      {isLoadingMore && (
        <Loader2 className="animate-spin w-full m-auto"></Loader2>
      )}
      {messages
        .filter(
          (message, index, self) =>
            index === self.findIndex((m) => m.id === message.id)
        )
        .map((message) => (
          <div
            ref={message.id === lastMessage.id ? lastMessageRef : null}
            key={message.id}>
            <MessageComponent message={message} />
          </div>
        ))}
    </div>
  );
}
