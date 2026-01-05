"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/api";

export default function AddShoePage() {
    const router = useRouter();
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [boysORgirls, setBoysORgirls] = useState("");
    const [quntity, setQuntity] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddShoe = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation
        if (!size || !type || !boysORgirls || !quntity) {
            setError("All fields are required");
            return;
        }

        if (Number(size) <= 0) {
            setError("Size must be a positive number");
            return;
        }

        if (Number(quntity) < 0) {
            setError("Quantity cannot be negative");
            return;
        }

        try {
            setLoading(true);
            const newShoe = {
                size: Number(size),
                type: type,
                boysORgirls: boysORgirls,
                quntity: Number(quntity),
            };

            await api.post("/shoes", newShoe);
            setSuccess("Shoe added successfully!");
            
            // Reset form
            setSize("");
            setType("");
            setBoysORgirls("");
            setQuntity("");

            // Redirect to home after 1.5 seconds
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (err) {
            const errorMessage = (err as any).response?.data?.detail || "Failed to add shoe";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen flex-col">
            <h1 className="text-2xl font-bold mb-4">Add New Shoe</h1>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            {success && <p className="text-green-500 mb-3">{success}</p>}

            <form onSubmit={handleAddShoe} className="flex flex-col gap-3">
                {/* Size */}
                <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="Shoe Size"
                    className="border p-2 mb-3 w-64"
                    min="1"
                    required
                />

                {/* Type */}
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border p-2 mb-3 w-64"
                    aria-label="Shoe Type"
                    required
                >
                    <option value="">Select Shoe Type</option>
                    <option value="Velcro">Velcro</option>
                    <option value="Sport/Lace">Sport/Lace</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Kennas">Kennas</option>
                    <option value="Pree-School">Pree-School</option>
                    <option value="Bota">Bota</option>
                    <option value="Pump">Pump</option>
                </select>
                {/* Boys or Girls */}
                <select
                    value={boysORgirls}
                    onChange={(e) => setBoysORgirls(e.target.value)}
                    className="border p-2 mb-3 w-64"
                    aria-label="Boys or Girls"
                    required
                >
                    <option value="">Select Boys or Girls</option>
                    <option value="Boys">Boys</option>
                    <option value="Girls">Girls</option>
                </select>

                {/* Quantity */}
                <input
                    type="number"
                    value={quntity}
                    onChange={(e) => setQuntity(e.target.value)}
                    placeholder="Quantity"
                    className="border p-2 mb-3 w-64"
                    min="0"
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                    {loading ? "Adding..." : "Add Shoe"}
                </button>
            </form>

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
                ← Back
            </button>
        </main>
    );
}