"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { getAuthCookie, removeAuthCookie } from "@/app/lib/cookies";
import AuthMenu from "./authMenu";
import GuestMenu from "./guestMenu";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthCookie().token;
    if (token) {
      const fetchProfile = async () => {
        try {
          const response = await api.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserProfile(response.data);
        } catch (err) {
          console.error("Gagal ambil profile:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    removeAuthCookie(); // Hapus cookie auth
    setUserProfile(null); // Reset state user
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return alert("Please enter a search term!");
    
    const encodedSearch = encodeURIComponent(trimmedTerm);
    router.push(`/search?q=${encodedSearch}`);
    setSearchTerm("");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full left-0 shadow-md bg-[#172B4D] px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logofinale.png"
              alt="Eventify Logo"
              width={40}
              height={24}
              priority
            />
            <span className="text-white font-bold text-lg">Eventify</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:block w-full max-w-md mx-4"
        >
          <div className="flex items-center border rounded-md border-white h-10 bg-white/10">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-2 bg-transparent text-white placeholder-gray-300 text-sm h-full focus:outline-none w-full"
            />
            <button type="submit" className="px-4 text-white hover:bg-white/10 h-full">
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
          <Link href="/events" className="text-white hover:underline">
            Events
          </Link>
          <Link href="/about" className="text-white hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-white hover:underline">
            Contact
          </Link>

          {isLoading ? (
            <div className="text-white">Loading...</div>
          ) : userProfile ? (
            <AuthMenu
              user={userProfile}
              toggleDropdown={() => setDropdownOpen(!dropdownOpen)}
              dropdownOpen={dropdownOpen}
              onLogout={handleLogout}
            />
          ) : (
            <GuestMenu />
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#172B4D] md:hidden p-4 space-y-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center border rounded-md border-white h-10 bg-white/10">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-2 bg-transparent text-white placeholder-gray-300 text-sm h-full focus:outline-none w-full"
                />
                <button type="submit" className="px-4 text-white hover:bg-white/10 h-full">
                  <Search size={18} />
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-3 text-white">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/events" onClick={() => setIsMobileMenuOpen(false)}>
                Events
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>

              {isLoading ? (
                <div>Loading...</div>
              ) : userProfile ? (
                <div className="flex flex-col gap-3">
                  <Link href="/dashboard/users" onClick={() => setIsMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
