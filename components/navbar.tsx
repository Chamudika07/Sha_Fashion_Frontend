'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded w-32" onClick={() => router.push("/login")}>
            Login
        </button>

      {/* Navigation links */}
      <div className="flex gap-6">
        <Link href="/?for=boys" className="hover:text-blue-400">
          Boys Shoes
        </Link>

        <Link href="/?for=girls" className="hover:text-blue-400">
          Girls Shoes
        </Link>

        <Link href="/boys-clothes" className="hover:text-blue-400">
          Boys School Clothes
        </Link>

        <Link href="/girls-clothes" className="hover:text-blue-400">
          Girls School Clothes
        </Link>
      </div>
    </nav>
  );
}
