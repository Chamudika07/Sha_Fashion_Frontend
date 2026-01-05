"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/api";

export default function BuySellShoePage() {
    const router = useRouter();
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [boysORgirls, setBoysORgirls] = useState("");
    const [quntity, setQuntity] = useState("");
    const [action, setAction] = useState("sell"); // Default action
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBuySellShoe = async (selectedAction: "buy" | "sell") => {
        setError("");
        setSuccess("");

        // Validation
        if (!size || !type || !boysORgirls || !quntity) {
            setError("All fields are required");
            return;
        }

        if (Number(quntity) <= 0) {
            setError("Quantity must be a positive integer");
            return;
        }

        try {
            setLoading(true);
            const updateData = {
                size: Number(size),
                type: type,
                boysORgirls: boysORgirls,
                quntity: Number(quntity),
                action: selectedAction,
            };

            await api.put("/shoes/quantity", updateData);
            
            const actionText = selectedAction === "sell" ? "Sold" : "Bought";
            setSuccess(`Shoe ${actionText.toLowerCase()} successfully!`);
            
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
            const errorMessage = (err as any).response?.data?.detail || `Failed to ${selectedAction} shoe`;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen flex-col">
            <h1 className="text-2xl font-bold mb-4">Buy / Sell Shoes</h1>

            {error && <p className="text-red-500 mb-3">{error}</p>}

            {success && <p className="text-green-500 mb-3">{success}</p>}

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
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
                    min="1"
                    required
                />

                {/* Buy and Sell Buttons */}
                <div className="flex gap-3 justify-center">
                    <button
                        type="button"
                        onClick={() => handleBuySellShoe("sell")}
                        disabled={loading}
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : "Sell"}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleBuySellShoe("buy")}
                        disabled={loading}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : "Buy"}
                    </button>
                </div>
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
