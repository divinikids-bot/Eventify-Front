"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import axios from "axios";
import { getAuthCookie } from "@/app/lib/cookies";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch) {
      console.log("Search:", debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return alert("Please enter a search term!");
    console.log("Manual Search:", searchTerm);
  };

  useEffect(() => {
    const auth = getAuthCookie();
    if (auth?.token) {
      axios
        .get(`http://localhost:8000/api/users/${auth.userId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => setUser(res.data.data))
        .catch((err) => console.error("Failed to fetch user profile:", err));
    }
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-[#172B4D] px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-4 flex-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logofinale.png" alt="Logo" width={50} height={30} />
              <span className="text-white font-bold text-lg">Eventify</span>
            </Link>
            <div className="flex items-center border rounded-md border-white h-10 max-w-md flex-1">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-2 bg-gray-100 text-white placeholder-gray-400 text-sm h-full focus:outline-none w-full"
              />
              <button
                onClick={handleSearch}
                className="h-full px-4 flex items-center justify-center"
              >
                <Search size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right: Nav Links + User or Auth */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white font-medium hover:underline">
              Home
            </Link>
            <Link
              href="/events"
              className="text-white font-medium hover:underline"
            >
              Events
            </Link>
            <Link
              href="/about"
              className="text-white font-medium hover:underline"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white font-medium hover:underline"
            >
              Contact
            </Link>

            {/* Cek apakah user sudah login */}
            {user ? (
              <div className="relative flex items-center gap-2">
                {/* Menampilkan gambar profil jika ada */}
                <Image
                  src={user.profileImageUrl || "/default-avatar.png"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {/* Tampilkan nama pengguna jika ada */}
                <span className="text-white font-medium">
                  {user.name || "USER"}
                </span>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md py-2 z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        document.cookie = "auth=; Max-Age=0"; // Hapus cookie
                        setUser(null); // Hapus user dari state
                        window.location.href = "/"; // Redirect ke home
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <span className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md cursor-pointer">
                    Login
                  </span>
                </Link>
                <Link href="/auth/signUp">
                  <span className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navbar skipped for brevity */}
      </div>
    </nav>
  );
}
