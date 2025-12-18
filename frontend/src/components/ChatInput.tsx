const ChatInput = () => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 outline-none"
                />
                <button className="bg-teal-600 text-white px-4 py-2 rounded-full">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatInput;