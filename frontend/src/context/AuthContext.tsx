import { createContext, useContext, ReactNode, useState } from "react";
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

interface AuthContextType {
    user: User | null;
    register: (data: any) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

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

    return (
        <AuthContext.Provider value={{ user, register }}>
            {children}
        </AuthContext.Provider>
    );
};