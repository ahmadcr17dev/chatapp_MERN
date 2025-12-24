import ChatList from "./ChatList";
import { IoMdLogOut } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import AddContactModal from "./AddContactModal";
import { useState } from "react";

const SideBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [open, setopen] = useState(false);

    const HandleLogout = async (e: any) => {
        e.preventDefault();
        logout();
        navigate("/login");
    }

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-800">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                    MERN ChatApp
                </h1>

                <div className="flex flex-row justify-between">
                    <button
                        title="Add user"
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-500/20 hover:text-green-600 transition hover:cursor-pointer"
                        onClick={() => setopen(true)}
                    >
                        <IoMdAddCircle size={20} />
                    </button>
                    <button
                        title="Logout"
                        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 transition hover:cursor-pointer"
                    >
                        <IoMdLogOut size={20} onClick={HandleLogout} />
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div
                className="flex items-center gap-2 m-4 px-4 py-1 rounded-full
             bg-gray-100 dark:bg-gray-700
             border border-gray-200 dark:border-gray-600
             focus-within:ring-2 focus-within:ring-teal-500"
            >
                <FiSearch className="text-gray-500 dark:text-gray-400" size={18} />

                <input
                    type="text"
                    placeholder="Search by name or number"
                    className="w-full bg-transparent text-sm
               text-gray-800 dark:text-white
               placeholder-gray-500 dark:placeholder-gray-400
               outline-none border-none focus:outline-none focus:ring-0"
                />
            </div>

            {/* Chat list */}
            <ChatList />

            {/* Open Add new chatters */}
            {open && <AddContactModal onClose={() => setopen(false)}/>}
        </div>
    );
};

export default SideBar;