"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface AuthMenuProps {
  session: any;
  toggleDropdown: () => void;
  dropdownOpen: boolean;
}

export default function AuthMenu({
  session,
  toggleDropdown,
  dropdownOpen,
}: AuthMenuProps) {
  console.log("Isi Session === ", session);
  return (
    <div className="relative dropdown-container">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
        aria-expanded={dropdownOpen}
      >
        <Image
          src={
            session.user?.image ||
            "https://media.discordapp.net/attachments/1366615074017513582/1369231594103115786/imgPlaceholder.png?ex=681d160b&is=681bc48b&hm=ef8cb6661b5c92bbc5c06f26ebdd04aa05ea8d4f1387d28ef7171d2310325cdb&=&format=webp&quality=lossless&width=1134&height=880"
          }
          alt="User profile"
          width={36}
          height={36}
          className="rounded-full object-cover border-2 border-white/50 hover:border-yellow-400 transition-colors"
        />
        <span className="text-white font-medium">
          {session.user?.name || "User"}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
          >
            Settings
          </Link>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              toggleDropdown();
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
