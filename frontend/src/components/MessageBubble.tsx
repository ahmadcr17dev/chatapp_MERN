interface Props {
  sender?: boolean;
}

const MessageBubble = ({ sender }: Props) => {
  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
        sender
          ? "ml-auto bg-teal-500 text-white"
          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
      }`}
    >
      Hello 👋
    </div>
  );
};

export default MessageBubble;