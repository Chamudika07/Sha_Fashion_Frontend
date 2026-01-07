"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/api";

type Tab = "shoe" | "shirt" | "short" | "frock";

export default function AddInventoryPage() {
    const router = useRouter();
    const [tab, setTab] = useState<Tab>("shoe");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    /* ---------------- SHOE STATES (UNCHANGED) ---------------- */
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [boysORgirls, setBoysORgirls] = useState("");
    const [quntity, setQuntity] = useState("");

    /* ---------------- SHIRT STATES ---------------- */
    const [shirtSize, setShirtSize] = useState("");
    const [shirtQty, setShirtQty] = useState("");

    /* ---------------- SHORT STATES ---------------- */
    const [shortSize, setShortSize] = useState("");
    const [shortColor, setShortColor] = useState("");
    const [shortType, setShortType] = useState("");
    const [shortQty, setShortQty] = useState("");

    /* ---------------- FROCK STATES ---------------- */
    const [frockSize, setFrockSize] = useState("");
    const [frockQty, setFrockQty] = useState("");

    const resetMsg = () => {
        setError("");
        setSuccess("");
    };

    /* ---------------- ADD SHOE ---------------- */
    const handleAddShoe = async (e: React.FormEvent) => {
        e.preventDefault();
        resetMsg();

        if (!size || !type || !boysORgirls || !quntity) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            await api.post("/shoes", {
                size: Number(size),
                type,
                boysORgirls,
                quntity: Number(quntity),
            });
            setSuccess("Shoe added successfully!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to add shoe");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- ADD SHIRT ---------------- */
    const handleAddShirt = async (e: React.FormEvent) => {
        e.preventDefault();
        resetMsg();

        try {
            setLoading(true);
            await api.post("/shirts", {
                size: Number(shirtSize),
                quntity: Number(shirtQty),
            });
            setSuccess("Shirt added successfully!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to add shirt");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- ADD SHORT ---------------- */
    const handleAddShort = async (e: React.FormEvent) => {
        e.preventDefault();
        resetMsg();

        try {
            setLoading(true);
            await api.post("/shorts", {
                size: Number(shortSize),
                color: shortColor,
                type: shortType,
                quntity: Number(shortQty),
            });
            setSuccess("Short added successfully!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to add short");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- ADD FROCK ---------------- */
    const handleAddFrock = async (e: React.FormEvent) => {
        e.preventDefault();
        resetMsg();

        try {
            setLoading(true);
            await api.post("/frocks", {
                size: frockSize,
                quntity: Number(frockQty),
            });
            setSuccess("Frock added successfully!");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Failed to add frock");
        } finally {
            setLoading(false);
        }
    };

    return (
    <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">

            {/* Title */}
            <h1 className="text-2xl font-bold mb-4 text-center">
                Add Inventory
            </h1>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6">
                {["shoe", "shirt", "short", "frock"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t as Tab)}
                        className={`px-4 py-2 rounded ${
                            tab === t
                                ? "bg-blue-600 text-white"
                                : "bg-pink-700"
                        }`}
                    >
                        {t.toUpperCase()}
                    </button>
                ))}
            </div>

            {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-3 text-center">{success}</p>}

            {/* Forms centered */}
            <div className="flex justify-center">
                {tab === "shoe" && (
                    <form onSubmit={handleAddShoe} className="flex flex-col gap-3 w-64">
                        <input type="number" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required />
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="">Type</option>
                            <option value="Velcro">Velcro</option>
                            <option value="Sport/Lace">Sport/Lace</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Kennas">Kennas</option>
                            <option value="Pree-School">Pree-School</option>
                            <option value="Bota">Bota</option>
                             <option value="Pump">Pump</option>
                        </select>
                        <select value={boysORgirls} onChange={(e) => setBoysORgirls(e.target.value)} required>
                            <option value="">Boys / Girls</option>
                            <option>Boys</option>
                            <option>Girls</option>
                        </select>
                        <input type="number" placeholder="Quantity" value={quntity} onChange={(e) => setQuntity(e.target.value)} required />
                        <button disabled={loading} className="bg-blue-600 text-white py-2 rounded">
                            Add Shoe
                        </button>
                    </form>
                )}

                {tab === "shirt" && (
                    <form onSubmit={handleAddShirt} className="flex flex-col gap-3 w-64">
                        <input type="number" placeholder="Size" value={shirtSize} onChange={(e) => setShirtSize(e.target.value)} required />
                        <input type="number" placeholder="Quantity" value={shirtQty} onChange={(e) => setShirtQty(e.target.value)} required />
                        <button className="bg-blue-600 text-white py-2 rounded">
                            Add Shirt
                        </button>
                    </form>
                )}

                {tab === "short" && (
                    <form onSubmit={handleAddShort} className="flex flex-col gap-3 w-64">
                        <input type="number" placeholder="Size" value={shortSize} onChange={(e) => setShortSize(e.target.value)} required />
                        <select value={shortColor} onChange={(e) => setShortColor(e.target.value)} required>
                            <option value="">Color</option>
                            <option>Blue</option>
                            <option>White</option>
                        </select>
                        <select value={shortType} onChange={(e) => setShortType(e.target.value)} required>
                            <option value="">Type</option>
                            <option>Strip</option>
                            <option>Elastic</option>
                        </select>
                        <input type="number" placeholder="Quantity" value={shortQty} onChange={(e) => setShortQty(e.target.value)} required />
                        <button className="bg-blue-600 text-white py-2 rounded">
                            Add Short
                        </button>
                    </form>
                )}

                {tab === "frock" && (
                    <form onSubmit={handleAddFrock} className="flex flex-col gap-3 w-64">
                        <select value={frockSize} onChange={(e) => setFrockSize(e.target.value)} required>
                            <option value="">Size</option>
                            {["XS","S","M","L","XL","2XL","3XL","4XL"].map(s => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                        <input type="number" placeholder="Quantity" value={frockQty} onChange={(e) => setFrockQty(e.target.value)} required />
                        <button className="bg-blue-600 text-white py-2 rounded">
                            Add Frock
                        </button>
                    </form>
                )}
            </div>

            {/* Back */}
            <button onClick={() => router.back()} className="mt-6 text-blue-600 block mx-auto">
                ← Back
            </button>
        </div>
    </main>
);


}
