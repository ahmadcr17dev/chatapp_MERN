import React from "react";
import { useAuth } from "../context/AuthContext"; // make sure your context exists

const ChatHeader: React.FC = () => {
    const { user } = useAuth(); // logged-in user from context

    if (!user) return null; // user not logged in or loading

    // avatar fallback based on gender
    const avatarUrl =
        user.profilepic ||
        (user.gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${user.username}`
            : `https://avatar.iran.liara.run/public/girl?username=${user.username}`);

    return (
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
            <img
                src={avatarUrl}
                className="w-10 h-10 rounded-full"
                alt="avatar"
            />
            <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                    {user.username}
                </p>
                <p className="text-xs text-green-500">online</p>
            </div>
        </div>
    );
};

export default ChatHeader;