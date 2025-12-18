const ChatItem = () => {
    return (
        <>
            <div className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-white">
                        Ahmad
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                        Last message...
                    </p>
                </div>

                <span className="text-xs text-gray-400">12:30</span>
            </div>
        </>
    );
}

export default ChatItem;