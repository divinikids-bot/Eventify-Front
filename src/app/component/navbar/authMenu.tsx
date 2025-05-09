"use client";

import Link from "next/link";
import Image from "next/image";

interface AuthMenuProps {
  user: any;
  toggleDropdown: () => void;
  dropdownOpen: boolean;
  onLogout: () => void;
}

export default function AuthMenu({
  user,
  toggleDropdown,
  dropdownOpen,
  onLogout,
}: AuthMenuProps) {
  const handleLogout = () => {
    // Hapus token/cookie dan panggil fungsi onLogout dari Navbar
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    onLogout(); // Reset userProfile ke null di Navbar
  };

  return (
    <div className="relative dropdown-container">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
        aria-expanded={dropdownOpen}
      >
        <Image
          src={user?.image || "/profile.jpg"}
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border border-white"
        />
        <span className="text-white font-medium">{user?.name || "User"}</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            href="/pages/dashboard/user"
            className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
          >
            Profile
          </Link>
          <Link
            href="/setting"
            className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
          >
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
