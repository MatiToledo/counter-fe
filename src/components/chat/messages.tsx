import { useToast } from "@/hooks/use-toast";
import { Message } from "@/lib/types/models";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { ToastAction } from "../ui/toast";
import { Loader2 } from "lucide-react";

export default function MessagesChat({
  messages,
  loadMoreMessages,
  loadingMore,
  haveNewMessage,
  setHaveNewMessage,
}: {
  messages: Message[];
  loadMoreMessages: (container: HTMLDivElement | null) => Promise<void>;
  loadingMore: boolean;
  haveNewMessage: boolean;
  setHaveNewMessage: Dispatch<SetStateAction<boolean>>;
}) {
  console.log("loadingMore: ", loadingMore);
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = async () => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      await loadMoreMessages(containerRef.current); // Pasar la referencia del contenedor
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const element = containerRef.current;
    const isBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (haveNewMessage && !isBottom) {
      toast({
        description: "Nuevo mensaje",
        action: (
          <ToastAction altText="Ver" onClick={scrollToBottom}>
            Ver
          </ToastAction>
        ),
      });
    }
  }, [haveNewMessage]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setHaveNewMessage(false);
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="flex-1 p-4 space-y-4 max-h-[calc(100vh-180px)] min-h-[calc(100vh-180px)] overflow-y-auto">
        {loadingMore && (
          <Loader2 className="animate-spin w-full m-auto"></Loader2>
        )}
        {messages
          .filter(
            (message, index, self) =>
              index === self.findIndex((m) => m.id === message.id)
          )
          .map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.isYou ? "items-end" : "items-start"
              }`}>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-sm font-semibold text-muted-foreground">
                  {message.sender}
                </span>
                <span className="text-xs text-muted-foreground mb-[1px]">
                  {message.timestamp}
                </span>
              </div>
              <div
                className={`rounded-lg px-3 py-2 text-sm max-w-[70%] ${
                  message.isYou
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-black dark:text-white"
                }`}>
                {message.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
