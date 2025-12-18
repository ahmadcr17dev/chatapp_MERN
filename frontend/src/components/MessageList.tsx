import MessageBubble from "./MessageBubble";

const MessageList = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <MessageBubble sender />
      <MessageBubble />
      <MessageBubble sender />
    </div>
  );
};

export default MessageList;