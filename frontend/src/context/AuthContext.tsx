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
    status: boolean,
    message: string,
    user: User,
    token: string
}

interface AuthContextType {
    user: User | null;
    register: (data: any) => Promise<{ success: boolean; message: string }>;
    login: (data: { username: string; password: string }) => Promise<LoginResponse>;
    token: string | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const register = async (data: any) => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", data);

            // Throw if backend responds with success: false
            if (res.data.success === false) {
                throw new Error(res.data.message);
            }

            return res.data; // success
        } catch (err: any) {
            // Network or Axios error
            throw new Error(err.response?.data?.message || "Registration failed");
        }
    };

    // persist login on refresh
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
        }
    }, []);

    // login
    const login = async (data: { username: string; password: string }) => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", data);

            // 🔴 THIS IS THE KEY FIX
            if (!res.data.success) {
                throw new Error(res.data.message);
            }

            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            return res.data;
        } catch (err: any) {
            throw new Error(
                err.response?.data?.message || err.message || "Login failed"
            );
        }
    };

    // logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ user, register, login, token, logout }}>
            {children}
        </AuthContext.Provider>
    );
};