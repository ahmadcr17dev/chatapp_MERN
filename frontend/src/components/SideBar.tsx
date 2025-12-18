import ChatList from "./ChatList";

const SideBar = () => {
    return (
        <>
            <div className="h-full flex flex-col bg-white dark:bg-gray-800">
                {/* Header */}
                <div className="p-4 font-bold text-lg text-white border-b dark:border-gray-700">
                    MERN ChatApp
                </div>

                {/* Chat list */}
                <ChatList />
            </div>
        </>
    );
}

export default SideBar;