import { calculateTimestamp } from "@/lib/utils";
import { Message } from "@/lib/types/models";
export default function MessageComponent({ message }: { message: Message }) {
  const { id, sender, text, createdAt, isYou } = message;
  return (
    <div
      key={id}
      className={`flex flex-col ${isYou ? "items-end" : "items-start"}`}>
      <div className="flex items-end gap-2 mb-1">
        <span className="text-sm font-semibold text-muted-foreground">
          {sender}
        </span>
        <span className="text-xs text-muted-foreground mb-[1px]">
          {calculateTimestamp(createdAt)}
        </span>
      </div>
      <div
        className={`rounded-lg px-3 py-2 text-sm max-w-[70%] ${
          isYou
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-black dark:text-white"
        }`}>
        {text}
      </div>
    </div>
  );
}
