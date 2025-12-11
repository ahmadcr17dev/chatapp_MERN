import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

const Login = () => {
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setloading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <SkeletonTheme
                baseColor="gray"        // soft gray
                highlightColor="#F3F4F6"   // subtle shimmer
            >
                <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">

                        <Skeleton height={32} width={180} className="mx-auto" />
                        <Skeleton height={20} width={220} className="mx-auto" />

                        <Skeleton height={18} width={120} />
                        <Skeleton height={48} />

                        <Skeleton height={18} width={120} />
                        <Skeleton height={48} />

                        <Skeleton height={50} />

                        <Skeleton height={18} width={200} className="mx-auto mt-4" />

                    </div>
                </section>
            </SkeletonTheme>
        );
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Log in to continue chatting
                </p>

                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition hover:cursor-pointer"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don’t have an account?{" "}
                    <NavLink
                        to={"/"}
                        className="text-teal-600 dark:text-teal-400 font-medium"
                    >
                        Sign Up
                    </NavLink>
                </p>
            </div>
        </section>
    );
};

export default Login;