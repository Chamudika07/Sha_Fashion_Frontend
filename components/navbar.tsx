'use client';

import router from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded w-32" onClick={() => router.push("/login")}>
            Login
        </button>

      {/* Navigation links */}
      <div className="flex gap-6">
        <Link href="/" className="hover:text-blue-400">
          Home
        </Link>

        <Link href="/projects" className="hover:text-blue-400">
          Projects
        </Link>

        <Link href="/about" className="hover:text-blue-400">
          About
        </Link>

        <Link href="/contact" className="hover:text-blue-400">
          Contact
        </Link>
      </div>
    </nav>
  );
}
