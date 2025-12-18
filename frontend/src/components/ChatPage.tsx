import { useEffect, useRef, useState } from 'react';
import SideBar from './SideBar';
import ChatWindow from './ChatWindow';

const MIN_WIDTH = 260;
const MAX_WIDTH = 500;
const STORAGE_KEY = "sidebar-width";

const ChatPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isResizingRef = useRef(false);

    // store sidebar width in localstorage
    const [sidebarWidth, setsidebarWidth] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? Number(saved) : 320;
    })

    // start resizing the sidebar
    const StartResize = () => {
        isResizingRef.current = true;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    }

    // stop resizing the sidebar
    const StopResize = () => {
        isResizingRef.current = false;
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
    }

    // allow mouse to drag to resize the sidebar
    const HandleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current || !containerRef.current) {
            return;
        }
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        const newWidth = e.clientX - containerLeft;
        if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
            setsidebarWidth(newWidth);
        }
    }

    // add & remove mouse events for resizing
    useEffect(() => {
        window.addEventListener("mousemove", HandleMouseMove);
        window.addEventListener("mouseup", StopResize);

        return () => {
            window.removeEventListener("mousemove", HandleMouseMove);
            window.removeEventListener("mouseup", StopResize);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, sidebarWidth.toString());
    }, [sidebarWidth]);

    return (
        <>
            <div
                className="h-screen flex bg-gray-100 dark:bg-gray-900"
                ref={containerRef}
            >
                {/* Sidebar */}
                <div
                    className="w-[30%] hidden md:block border-r border-gray-300 dark:border-gray-700"
                    style={{ width: sidebarWidth }}
                >
                    <SideBar />
                </div>

                {/* Drag Handle */}
                <div
                    onMouseDown={StartResize}
                    className="hidden md:block w-1 cursor-col-resize bg-gray-300 dark:bg-gray-700 hover:bg-teal-500"
                />

                {/* Chat Window */}
                <div className="flex-1">
                    <ChatWindow />
                </div>
            </div>
        </>
    );
}

export default ChatPage;