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

    const checkPhone = async () => {
        if (!phone) return;

        setLoading(true);
        setError("");
        setFoundUser(null);

        try {
            // ✅ Send cookie along with request
            const response = await fetch(import.meta.env.VITE_CHECKPHONE_KEY, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone }),
                credentials: "include", // Important! Sends JWT cookie
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "User not found");
            } else {
                setFoundUser(data.user);
            }
        } catch (err) {
            setError("Network Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl p-6 space-y-4 shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        New Chat
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                {/* Phone Input */}
                <PhoneInput
                    defaultCountry="pk"
                    value={phone}
                    onChange={setPhone}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                />

                {/* Check Button */}
                <button
                    onClick={checkPhone}
                    disabled={!phone || loading}
                    className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:opacity-50 transition"
                >
                    {loading ? "Checking..." : "Next"}
                </button>

                {/* Result */}
                {foundUser && (
                    <div className="flex items-center gap-3 p-3 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
                        <img
                            src={foundUser.profilepic}
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-white">
                                {foundUser.username}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {foundUser.fullname}
                            </p>
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