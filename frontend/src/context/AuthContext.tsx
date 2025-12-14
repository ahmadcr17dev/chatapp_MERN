import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

interface User {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    gender: string;
    profilepic: string;
    phone: string;
}

interface LoginResponse {
    success: boolean;
    message: string;
    user: User;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    register: (data: any) => Promise<{ success: boolean; message: string }>;
    login: (data: { username: string; password: string }) => Promise<LoginResponse>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // restore user once
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const register = async (data: any) => {
        const res = await axios.post(import.meta.env.VITE_REGISTER_KEY, data);
        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        return res.data;
    };

    const login = async (data: { username: string; password: string }) => {
        const res = await axios.post(
            import.meta.env.VITE_LOGIN_KEY,
            data,
            { withCredentials: true }
        );

        if (!res.data.success) {
            throw new Error(res.data.message);
        }

        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        return res.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};