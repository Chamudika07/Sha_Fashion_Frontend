"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/api";

type Tab = "shoe" | "shirt" | "short" | "frock";

export default function BuySellPage() {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>("shoe");

    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const [boysORgirls, setBoysORgirls] = useState("");
    const [quntity, setQuntity] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const inputClass =
        "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300";

    const handleAction = async (action: "buy" | "sell") => {
        setError("");
        setSuccess("");

        if (!size || !quntity) {
            setError("All required fields must be filled");
            return;
        }

        if (Number(quntity) <= 0) {
            setError("Quantity must be greater than 0");
            return;
        }

        try {
            setLoading(true);

            if (tab === "shoe") {
                await api.put("/shoes/quantity", {
                    size: Number(size),
                    type,
                    boysORgirls,
                    quntity: Number(quntity),
                    action,
                });
            }

            if (tab === "shirt") {
                await api.put("/shirts/quantity", {
                    size: Number(size),
                    quntity: Number(quntity),
                    action,
                });
            }

            if (tab === "short") {
                await api.put("/shorts", {
                    size: Number(size),
                    color,
                    type,
                    quntity: Number(quntity),
                    action,
                });
            }

            if (tab === "frock") {
                await api.put("/frocks/quantity", {
                    size,
                    quntity: Number(quntity),
                    action,
                });
            }

            setSuccess(`Successfully ${action === "buy" ? "bought" : "sold"} item`);
            setSize("");
            setType("");
            setColor("");
            setBoysORgirls("");
            setQuntity("");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Action failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md">

                <h1 className="text-2xl font-bold mb-4 text-center">
                    Buy / Sell Inventory
                </h1>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-6">
                    {["shoe", "shirt", "short", "frock"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t as Tab)}
                            className={`px-4 py-2 rounded ${
                                tab === t ? "bg-blue-600 text-white" : "bg-pink-700"
                            }`}
                        >
                            {t.toUpperCase()}
                        </button>
                    ))}
                </div>

                {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
                {success && <p className="text-green-500 mb-3 text-center">{success}</p>}

                <div className="flex justify-center">
                    <div className="flex flex-col gap-4 w-64">

                        {/* SIZE */}
                        {tab === "frock" ? (
                            <select
                                className={inputClass}
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                required
                            >
                                <option value="">Size</option>
                                <option>XS</option>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                                <option>2XL</option>
                                <option>3XL</option>
                                <option>4XL</option>
                            </select>
                        ) : (
                            <input
                                className={inputClass}
                                type="text"
                                placeholder="Size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                required
                            />
                        )}

                        {/* Shoe fields */}
                        {tab === "shoe" && (
                            <>
                                <select className={inputClass} value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Type</option>
                                    <option>Velcro</option>
                                    <option>Sport/Lace</option>
                                    <option>Nurse</option>
                                    <option>Kennas</option>
                                    <option>Bota</option>
                                    <option>Pump</option>
                                </select>

                                <select
                                    className={inputClass}
                                    value={boysORgirls}
                                    onChange={(e) => setBoysORgirls(e.target.value)}
                                >
                                    <option value="">Boys / Girls</option>
                                    <option>Boys</option>
                                    <option>Girls</option>
                                </select>
                            </>
                        )}

                        {/* Short fields */}
                        {tab === "short" && (
                            <>
                                <select className={inputClass} value={color} onChange={(e) => setColor(e.target.value)}>
                                    <option value="">Color</option>
                                    <option>Blue</option>
                                    <option>White</option>
                                </select>

                                <select className={inputClass} value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Type</option>
                                    <option>Strip</option>
                                    <option>Elastic</option>
                                </select>
                            </>
                        )}

                        {/* Quantity */}
                        <input
                            className={inputClass}
                            type="number"
                            placeholder="Quantity"
                            value={quntity}
                            onChange={(e) => setQuntity(e.target.value)}
                            required
                        />

                        {/* Buttons */}
                        <div className="flex gap-3 justify-center mt-2">
                            <button
                                disabled={loading}
                                onClick={() => handleAction("sell")}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Sell
                            </button>
                            <button
                                disabled={loading}
                                onClick={() => handleAction("buy")}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => router.back()}
                    className="mt-6 text-blue-600 block mx-auto"
                >
                    ← Back
                </button>
            </div>
        </main>
    );
}
