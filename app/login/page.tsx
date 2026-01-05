"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";   

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const response = await api.post(
                "/users/login", 
                formData, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            //save the token
            localStorage.setItem("access_token", response.data.access_token);
            //check git status
            //redirect to home page
            router.push("/");
        } catch (err) {
            setError("Login failed. Please check your credentials.");
            console.error("Login error:", err);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen flex-col">
            <h1 className="text-2xl font-bold mb-4"> Login</h1>

            <input
                type="email"
                placeholder="Email"
                className="border p-2 mb-3 w-64"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 mb-3 w-64"
                onChange={(e) => setPassword(e.target.value)}
            />
            
            {error && <p className="text-red-500 mb-3">{error}</p>}

            <button
                className="bg-blue-600 text-white px-6 py-2 rounded"
                onClick={handleLogin}
            >
                Login
            </button>

        </main>
    );
            
}