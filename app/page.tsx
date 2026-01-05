"use client";

import { useEffect, useState } from "react";
import {getAllShoes} from "../services/shoes";
import { useRouter } from "next/navigation";

interface Shoe {
  id: number;
  size: number;
  type: string;
  boysORgirls: string;
  quntity: number;
  created_at: string;
}


export default function HomePage() {
    const router = useRouter();
    const [shoeList, setShoeList] = useState<Shoe[]>([]);

    useEffect(() => {
      getAllShoes()
        .then((data) => setShoeList(data))
        .catch((error) => console.error("Error loading shoes:", error));
    }, []);

    return (
      <main className="p-6">
        
        <div className="flex flex-row gap-4 items-center justify-center mb-8">
          <button className="bg-green-600 text-white px-6 py-2 rounded w-32" onClick={() => router.push("/add")}>
            Add
          </button>
          
          <button className="bg-purple-600 text-white px-6 py-2 rounded w-32" onClick={() => router.push("/quantity")}>
            Buy/Sell
          </button>

          <button className="bg-yellow-600 text-white px-6 py-2 rounded w-32" onClick={() => router.push("/update")}>
            Update
          </button>
     
          <button className="bg-blue-600 text-white px-6 py-2 rounded w-32" onClick={() => router.push("/login")}>
            Login
          </button>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Shoe Collection</h1>

          {(() => {
            // Group shoes by "For" first, then by "Type"
            const groupedByForAndType = shoeList.reduce((acc, shoe) => {
              if (!acc[shoe.boysORgirls]) {
                acc[shoe.boysORgirls] = {};
              }
              if (!acc[shoe.boysORgirls][shoe.type]) {
                acc[shoe.boysORgirls][shoe.type] = [];
              }
              acc[shoe.boysORgirls][shoe.type].push(shoe);
              return acc;
            }, {} as Record<string, Record<string, Shoe[]>>);

            return Object.entries(groupedByForAndType).map(([forCategory, types]) => (
              <div key={forCategory} className="mb-6">
                <h2 className="text-xl font-bold bg-indigo-900 p-3 rounded mb-4">{forCategory}</h2>
                
                {Object.entries(types).map(([typeCategory, shoes]) => (
                  <div key={typeCategory} className="mb-4 ml-4">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">{typeCategory}</h3>
                    
                    {shoes.map((shoe) => (
                      <div key={shoe.id} className="mb-4 ml-4 p-4 border rounded flex gap-6 items-center">
                        <h2 className="text-xl font-semibold">{shoe.size}</h2>
                        <p>Type: {shoe.type}</p>
                        <p>Quantity: {shoe.quntity}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ));
          })()}
        </div>
      </main>
);
}

