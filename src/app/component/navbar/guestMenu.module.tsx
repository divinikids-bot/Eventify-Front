'use client';

import Link from 'next/link';

export default function GuestMenu() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/auth/login">
        <span className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer">
          Login
        </span>
      </Link>
      <Link href="/auth/signUp">
        <span className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer">
          Sign Up
        </span>
      </Link>
    </div>
  );
}
