import { NavLink } from "react-router-dom";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [loading, setloading] = useState(true);

    const [showconfetti, setshowconfetti] = useState(false);
    const [windowsize, setwindowsize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

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
    
    useEffect(() => {
        const timer = setTimeout(() => setloading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Resize listener
    useEffect(() => {
        const HandleResize = () => {
            setwindowsize({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };
        window.addEventListener("resize", HandleResize);
        return () => window.removeEventListener("resize", HandleResize);
    }, []);


    // Disappear messages after some seconds
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearInterval(timer);
    }, [message])

    // Form input handler
    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    // Phone input handler
    const PhoneHandleChange = (phone: string) => {
        setform({ ...form, phone });
    };

    // Submit Handler
    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // username must be in lowercase
        if (form.username !== form.username.toLowerCase()) {
            setMessage({ text: "Username must be in lowercase", type: "error" });
            return;
        }

        // match password
        if (form.password !== form.confirmpassword) {
            setMessage({ text: "Password & Confirm Password must be same", type: "error" });
            return;
        }

        try {
            const result = await register(form); // will throw on backend error

            // Success message
            setMessage({ text: result.message || "Account Created Successfully", type: "success" });
            setshowconfetti(true);

            setTimeout(() => {
                setshowconfetti(false);
                navigate("/login");
            }, 5000);

            setform({
                fullname: "",
                username: "",
                email: "",
                password: "",
                confirmpassword: "",
                gender: "",
                phone: ""
            });

        } catch (err: any) {
            setMessage({ text: err.message, type: "error" });
        }
    };

    if (loading) {
        return (
            <SkeletonTheme
                baseColor="#1F2937"        // Tailwind gray-200
                highlightColor="#374151"   // Tailwind gray-100
            >
                <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
                    <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 md:p-10 space-y-6">

                        {/* Header */}
                        <Skeleton height={32} width={200} className="mx-auto rounded-md" />
                        <Skeleton height={20} width={240} className="mx-auto rounded-md" />

                        {/* Full Name & Username */}
                        <div className="flex flex-col md:flex-row gap-4 my-2">
                            <div className="flex-1 space-y-2">
                                <Skeleton height={18} width={120} className="rounded-md" />
                                <Skeleton height={48} className="rounded-lg" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Skeleton height={18} width={120} className="rounded-md" />
                                <Skeleton height={48} className="rounded-lg" />
                            </div>
                        </div>

                        {/* Email & Gender & Phone */}
                        <div className="flex flex-col md:flex-row gap-4 my-2">
                            <div className="flex-1 space-y-2">
                                <Skeleton height={18} width={120} className="rounded-md" />
                                <Skeleton height={48} className="rounded-lg" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Skeleton height={18} width={120} className="rounded-md" />
                                <Skeleton height={48} className="rounded-lg" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Skeleton height={18} width={120} className="rounded-md" />
                                <Skeleton height={48} className="rounded-lg" />
                            </div>
                        </div>

                        {/* Password & Confirm Password */}
                        <div className="flex flex-col md:flex-row gap-4 my-2">
                            <div className="flex-1 space-y-2">
                                <Skeleton height={18} width={140} className="rounded-md" />
                                <Skeleton height={48} className="rounded-lg" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Skeleton height={18} width={160} className="rounded-md" />
                                <Skeleton height={48} className="rounded-lg" />
                            </div>
                        </div>

                        {/* Error/Message */}
                        <Skeleton height={20} width={200} className="mx-auto mt-2 rounded-md" />

                        {/* Submit Button */}
                        <Skeleton height={50} className="rounded-lg mt-4" />

                        {/* Login Link */}
                        <Skeleton height={18} width={180} className="mx-auto mt-6 rounded-md" />

                    </div>
                </section>
            </SkeletonTheme>
        );
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
            <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10">

                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                    Join the chat community!
                </p>

                {/* FORM START */}
                <form onSubmit={HandleSubmit} className="space-y-4">

                    {/* Full Name + Username */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                required
                                name="fullname"
                                value={form.fullname}
                                onChange={HandleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="ahmad123"
                                required
                                name="username"
                                value={form.username}
                                onChange={HandleChange}
                                minLength={7}
                                maxLength={15}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Email + Gender + Phone */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                name="email"
                                value={form.email}
                                onChange={HandleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Gender
                            </label>
                            <select
                                required
                                name="gender"
                                value={form.gender}
                                onChange={HandleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone
                            </label>
                            <div className="flex items-center w-full rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
                                <PhoneInput
                                    forceDialCode
                                    defaultCountry="pk"
                                    inputClassName="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-2.5 outline-none"
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

                    {/* Password + Confirm Password */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                name="password"
                                value={form.password}
                                onChange={HandleChange}
                                minLength={8}
                                maxLength={15}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                name="confirmpassword"
                                value={form.confirmpassword}
                                onChange={HandleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Error/Success Message */}
                    {message && (
                        <div className={message.type === "success" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                            {message.text}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-4 w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition hover:cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-teal-600 dark:text-teal-400 font-semibold">
                        Login
                    </NavLink>
                </p>
            </div>

            {/* Confetti Effect */}
            {showconfetti && (
                <Confetti width={windowsize.width} height={windowsize.height} numberOfPieces={300} />
            )}
        </section>
    )
};

export default Register;