import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { IoClose } from "react-icons/io5";

interface FoundUser {
    _id: string;
    fullname: string;
    username: string;
    profilepic: string;
}

interface Props {
    onClose: () => void;
}

const AddContactModal: React.FC<Props> = ({ onClose }) => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
    const [error, setError] = useState("");

    // 🔍 STEP 1: CHECK PHONE
    const checkPhone = async () => {
        if (!phone) return;

        setLoading(true);
        setError("");
        setFoundUser(null);

        try {
            const response = await fetch(import.meta.env.VITE_CHECKPHONE_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // JWT cookie
                body: JSON.stringify({ phone }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setFoundUser(data.user);
        } catch {
            setError("Network Error");
        } finally {
            setLoading(false);
        }
    };

    // 💬 STEP 2: START CHAT
    const startChat = () => {
        if (!foundUser) return;

        localStorage.setItem("activeChatUser", JSON.stringify(foundUser));
        window.dispatchEvent(new Event("activeChatChanged"));
        onClose();
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl p-6 space-y-4 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg text-white font-semibold">New Chat</h2>
                    <button onClick={onClose} className="hover:cursor-pointer">
                        <IoClose size={20} color="white" />
                    </button>
                </div>

                {/* Phone Input */}
                <PhoneInput
                    defaultCountry="pk"
                    value={phone}
                    onChange={setPhone}
                />

                {/* Next Button */}
                <button
                    onClick={checkPhone}
                    disabled={!phone || loading}
                    className="w-full bg-teal-600 text-white py-2 rounded hover:cursor-pointer"
                >
                    {loading ? "Checking..." : "Next"}
                </button>

                {/* Found User */}
                {foundUser && (
                    <div
                        onClick={startChat}
                        className="flex items-center gap-3 p-3 border rounded hover:cursor-pointer text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <img
                            src={foundUser.profilepic}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="font-semibold">{foundUser.username}</p>
                            <p className="text-sm text-gray-500">{foundUser.fullname}</p>
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default AddContactModal;