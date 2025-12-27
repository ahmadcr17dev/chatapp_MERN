import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface ChatUser {
    _id: string;
    username: string;
    gender: "male" | "female";
    profilepic?: string;
}

const ChatHeader: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const [chatUser, setChatUser] = useState<ChatUser | null>(null);
    const { user } = useAuth();
    if (!user) return null;

    const loadActiveChatUser = () => {
        const stored = localStorage.getItem("activeChatUser");
        setChatUser(stored ? JSON.parse(stored) : null);
    };

    useEffect(() => {
        loadActiveChatUser(); // initial load

        // listen for custom event when user clicks a new chat
        window.addEventListener("activeChatChanged", loadActiveChatUser);

        return () => {
            window.removeEventListener("activeChatChanged", loadActiveChatUser);
        };
    }, [user]);

    if (!chatUser) {
        return (
            <div className="p-4 border-b text-gray-500">
                Select a chat to start messaging
            </div>
        );
    }

    const avatar =
        chatUser.profilepic ||
        (chatUser.gender === "female"
            ? `https://avatar.iran.liara.run/public/girl?username=${chatUser.username}`
            : `https://avatar.iran.liara.run/public/boy?username=${chatUser.username}`);

    return (
        <div className="flex items-center gap-3 p-4 border-b bg-gray-700">
            <img
                src={avatar}
                onLoad={() => setLoaded(true)}
                className={`w-10 h-10 rounded-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"
                    }`}
                alt="avatar"
            />
            <div>
                <p className="font-semibold text-white">{chatUser.username}</p>
                <p className="text-xs text-green-500">online</p>
            </div>
        </div>
    );
};

export default ChatHeader;