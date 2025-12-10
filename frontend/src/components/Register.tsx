import { NavLink } from "react-router-dom";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const { register } = useAuth();
    const [form, setform] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        gender: "",
        phone: ""
    });
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const PhoneHandleChange = (phone: string) => {
        setform({ ...form, phone });
    }

    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmpassword) {
            setMessage({ text: "Password & Confirm Password must be same", type: "error" });
            return;
        }
        try {
            await register(form);
            setMessage({ text: "Account Created Successfully", type: "success" });
            setform({
                fullname: "",
                username: "",
                email: "",
                password: "",
                confirmpassword: "",
                gender: "",
                phone: ""
            })
        } catch (error: any) {
            setMessage({ text: error.message, type: "error" });
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10">

                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Join the chat community!
                </p>

                {/* FORM START */}
                <form onSubmit={HandleSubmit}>

                    <div className="flex flex-row justify-between gap-4 my-2">
                        {/* Full Name */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700
                            border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white
                            placeholder:text-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="John Doe"
                                required
                                name="fullname"
                                value={form.fullname}
                                onChange={HandleChange}
                            />
                        </div>

                        {/* Username */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700
                            border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white
                            placeholder:text-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="ahmad123"
                                required
                                name="username"
                                value={form.username}
                                onChange={HandleChange}
                                minLength={7}
                                maxLength={15}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between gap-4 my-2">
                        {/* Email */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 
                            border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white
                            placeholder:text-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="you@example.com"
                                required
                                name="email"
                                value={form.email}
                                onChange={HandleChange}
                            />
                        </div>

                        {/* Gender */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Gender
                            </label>
                            <select
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 
                            border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                required
                                name="gender"
                                value={form.gender}
                                onChange={HandleChange}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone
                            </label>
                            <div className="flex items-center w-full rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
                                <PhoneInput
                                    forceDialCode
                                    defaultCountry="pk"
                                    inputClassName="w-full bg-transparent text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder-gray-500 px-4 py-2.5 outline-none"
                                    countrySelectorStyleProps={{
                                        buttonClassName: "bg-gray-100 dark:bg-gray-700 border-none rounded-l-lg px-2",
                                        dropdownArrowClassName: "bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600",
                                    }}
                                    name="phone"
                                    value={form.phone}
                                    onChange={PhoneHandleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between gap-4 my-2">
                        {/* Password */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700
                            border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white
                            placeholder:text-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="••••••••"
                                required
                                name="password"
                                value={form.password}
                                onChange={HandleChange}
                                minLength={8}
                                maxLength={15}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700
                            border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white
                            placeholder:text-gray-400 dark:placeholder-gray-500
                            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                                placeholder="••••••••"
                                required
                                name="confirmpassword"
                                value={form.confirmpassword}
                                onChange={HandleChange}
                            />
                        </div>
                    </div>
                    {/* Error Message */}
                    {message && (
                        <div className={`col-span-1 md:col-span-3 mt-4 font-medium ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>
                            {message.text}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-3">
                        <button
                            type="submit"
                            className="mt-4 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white
                            rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition hover:cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>

                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-teal-600 dark:text-teal-400 font-semibold">
                        Login
                    </NavLink>
                </p>
            </div>
        </section>
    );
};

export default Register;