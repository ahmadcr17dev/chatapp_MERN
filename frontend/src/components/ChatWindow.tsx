import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
    return (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
            <ChatHeader />
            <MessageList />
            <ChatInput />
        </div>
    );
};

export default ChatWindow;