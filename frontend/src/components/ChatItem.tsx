import React from "react";
import { useAuth } from "../context/AuthContext";

const ChatItem: React.FC = () => {
    const { user } = useAuth();
    // return null if chatUser is not passed yet
    if (!user) return;

    // fallback avatar based on gender
    const avatarUrl =
        user.profilepic ||
        (user.gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${user.username}`
            : `https://avatar.iran.liara.run/public/girl?username=${user.username}`);

    return (
        <div className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <img
                src={avatarUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full"
            />

            <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-white">
                    {user.username || "Unknown User"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                    Last message...
                </p>
            </div>

            <span className="text-xs text-gray-400">12:30</span>
        </div>
    );
};

export default ChatItem;