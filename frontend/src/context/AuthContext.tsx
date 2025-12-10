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
    register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const register = async (data: any) => {
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", data);
            setUser(res.data); // backend sends the user object
            localStorage.setItem("user", JSON.stringify(res.data));
            return res.data;
        } catch (err: any) {
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <AuthContext.Provider value={{ user, register }}>
            {children}
        </AuthContext.Provider>
    );
};