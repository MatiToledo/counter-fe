import MessageForm from "../forms/message";

export default function SendMessage({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) {
  return (
    <div className="p-4 border-t">
      <MessageForm sendMessage={sendMessage}></MessageForm>
    </div>
  );
}
