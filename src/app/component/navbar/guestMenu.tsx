'use client';

import Link from 'next/link';

export default function GuestMenu() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/auth/login">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer">
          Login
        </button>
      </Link>
      <Link href="/auth/signUp">
        <button className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
