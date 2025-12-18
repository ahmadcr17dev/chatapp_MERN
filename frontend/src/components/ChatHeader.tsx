const ChatHeader = () => {
    return (
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
            <img
                src="https://i.pravatar.cc/40"
                className="w-10 h-10 rounded-full"
            />
            <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                    Ahmad
                </p>
                <p className="text-xs text-green-500">online</p>
            </div>
        </div>
    );
};

export default ChatHeader;