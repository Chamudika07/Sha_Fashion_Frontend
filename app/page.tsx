"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ===== API SERVICES =====
import { getAllShoes } from "../services/shoes";
import { getAllFrocks } from "@/services/frocks";
import { getAllShirts } from "@/services/shirts";
import { getAllShorts } from "@/services/shorts";

// ===== INTERFACES (DATA SHAPES) =====
interface Shoe {
  id: number;
  size: number;
  type: string;
  boysORgirls: string;
  quntity: number;
  created_at: string;
}

interface Frock {
  id: number;
  size: string;
  quntity: number;
  created_at: string;
}

interface Shirt {
  id: number;
  size: string;
  quntity: number;
  created_at: string;
}

interface Short {
  id: number;
  size: string;
  color: string;
  type: string;
  quntity: number;
  created_at: string;
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ===== READ QUERY PARAMETERS FROM URL =====
  const filterFor = searchParams.get("for"); 
  // ?for=boys | ?for=girls (used for shoes)

  const category = searchParams.get("category");
  // ?category=boys-clothes | ?category=girls-clothes

  // ===== STATE VARIABLES =====
  const [shoeList, setShoeList] = useState<Shoe[]>([]);
  const [frockList, setFrockList] = useState<Frock[]>([]);
  const [shirtList, setShirtList] = useState<Shirt[]>([]);
  const [shortList, setShortList] = useState<Short[]>([]);

  // ===== FETCH SHOES =====
  useEffect(() => {
    getAllShoes()
      .then((data) => setShoeList(data))
      .catch((error) => console.error("Error loading shoes:", error));
  }, []);

  // ===== FETCH FROCKS =====
  useEffect(() => {
    getAllFrocks()
      .then((data) => setFrockList(data))
      .catch((error) => console.error("Error loading frocks:", error));
  }, []);

  // ===== FETCH SHIRTS =====
  useEffect(() => {
    getAllShirts()
      .then((data) => setShirtList(data))
      .catch((error) => console.error("Error loading shirts:", error));
  }, []);

  // ===== FETCH SHORTS =====
  useEffect(() => {
    getAllShorts()
      .then((data) => setShortList(data))
      .catch((error) => console.error("Error loading shorts:", error));
  }, []);

  // ===== FILTER SHOES BY BOYS / GIRLS =====
  const filteredShoes = filterFor
    ? shoeList.filter(
        (shoe) =>
          shoe.boysORgirls.toLowerCase() === filterFor.toLowerCase()
      )
    : shoeList;

  return (
    <main className="p-6">

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-4 justify-center mb-8">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded w-32"
          onClick={() => router.push("/add")}
        >
          Add
        </button>

        <button
          className="bg-purple-600 text-white px-6 py-2 rounded w-32"
          onClick={() => router.push("/quantity")}
        >
          Buy/Sell
        </button>

        <button
          className="bg-yellow-600 text-white px-6 py-2 rounded w-32"
          onClick={() => router.push("/update")}
        >
          Update
        </button>
      </div>

      {/* ================================================== */}
      {/* ===================== SHOES ====================== */}
      {/* SHOW ONLY WHEN CATEGORY IS NULL */}
      {/* ================================================== */}

      {!category && (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Shoe Collection
            {filterFor && (
              <span className="ml-2 text-sm text-gray-500">
                ({filterFor.toUpperCase()})
              </span>
            )}
          </h1>

          {(() => {
            // GROUP SHOES BY BOYS/GIRLS AND TYPE
            const grouped = filteredShoes.reduce((acc, shoe) => {
              if (!acc[shoe.boysORgirls]) acc[shoe.boysORgirls] = {};
              if (!acc[shoe.boysORgirls][shoe.type])
                acc[shoe.boysORgirls][shoe.type] = [];
              acc[shoe.boysORgirls][shoe.type].push(shoe);
              return acc;
            }, {} as Record<string, Record<string, Shoe[]>>);

            return Object.entries(grouped).map(
              ([gender, types]) => (
                <div key={gender} className="mb-6">
                  <h2 className="text-xl font-bold bg-indigo-900 p-3 rounded mb-4">
                    {gender}
                  </h2>

                  {Object.entries(types).map(
                    ([type, shoes]) => (
                      <div key={type} className="ml-4 mb-4">
                        <h3 className="text-lg font-semibold text-blue-600 mb-2">
                          {type}
                        </h3>

                        {[...shoes].sort((a, b) => a.size - b.size).map((shoe) => (
                          <div
                            key={shoe.id}
                            className="ml-4 mb-2 p-4 border rounded flex gap-6"
                          >
                            <p>Size: {shoe.size}</p>
                            <p>Quantity: {shoe.quntity}</p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )
            );
          })()}
        </div>
      )}

      {/* ================================================== */}
      {/* ============ BOYS SCHOOL CLOTHES ================= */}
      {/* ================================================== */}

      {category === "boys-clothes" && (
        <div>
          <h1 className="text-2xl font-bold mb-6">Boys School Clothes</h1>

          {/* SHIRTS */}
          <h2 className="text-xl font-bold bg-indigo-900 p-3 rounded mb-4">Shirts</h2>
          {shirtList.map((shirt) => (
            <div key={shirt.id} className="mb-3 p-4 border rounded">
              <p>Size: {shirt.size}</p>
              <p>Quantity: {shirt.quntity}</p>
            </div>
          ))}

          {/* SHORTS (GROUPED BY COLOR) */}
          <h2 className="text-xl font-bold bg-indigo-900 p-3 rounded mb-4">Shorts</h2>

          {(() => {
            const groupedByColor = shortList.reduce((acc, short) => {
              if (!acc[short.color]) acc[short.color] = [];
              acc[short.color].push(short);
              return acc;
            }, {} as Record<string, Short[]>);

            return Object.entries(groupedByColor).map(
              ([color, shorts]) => (
                <div key={color} className="mb-4">
                  <h3 className="text-lg font-semibold text-blue-600">
                    Color: {color}
                  </h3>

                  {shorts.map((short) => (
                    <div
                      key={short.id}
                      className="ml-4 mt-2 p-4 border rounded"
                    >
                      <p>Size: {short.size}</p>
                      <p>Type: {short.type}</p>
                      <p>Quantity: {short.quntity}</p>
                    </div>
                  ))}
                </div>
              )
            );
          })()}
        </div>
      )}

      {/* ================================================== */}
      {/* =========== GIRLS SCHOOL CLOTHES ================= */}
      {/* ================================================== */}

      {category === "girls-clothes" && (
        <div>
          <h1 className="text-xl font-bold bg-indigo-900 p-3 rounded mb-4">Girls School Clothes</h1>

          {frockList.map((frock) => (
            <div key={frock.id} className="mb-4 p-4 border rounded">
              <p>Size: {frock.size}</p>
              <p>Quantity: {frock.quntity}</p>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}
