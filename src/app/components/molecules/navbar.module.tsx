'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import axios from 'axios';
import { getAuthCookie } from '@/app/lib/cookies';
import Cookies from 'js-cookie';

interface AuthInfo {
  token?: string | null;
  userId?: string | null;
}

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthInfo>(getAuthCookie() || {});

  useEffect(() => {
    const currentAuth = getAuthCookie();
    setAuthInfo(currentAuth || {});
  }, []);

  useEffect(() => {
    if (authInfo?.token && authInfo?.userId) {
      axios
        .get(`http://localhost:8000/api/users/${authInfo.userId}`, {
          headers: {
            Authorization: `Bearer ${authInfo.token}`,
          },
        })
        .then((res) => setUser(res.data.data))
        .catch((err) => console.error('Failed to fetch user profile:', err));
    } else {
      setUser(null);
    }
  }, [authInfo?.token, authInfo?.userId]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return alert('Please enter a search term!');
    console.log('Manual Search:', searchTerm);
  };

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
            <Link href="/" className="text-white font-medium hover:underline">Home</Link>
            <Link href="/events" className="text-white font-medium hover:underline">Events</Link>
            <Link href="/about" className="text-white font-medium hover:underline">About</Link>
            <Link href="/contact" className="text-white font-medium hover:underline">Contact</Link>

            {user ? (
              <div className="relative flex items-center gap-2">
                <Image
                  src={user.profileImageUrl || '/default-avatar.png'}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full cursor-pointer object-cover"
                  onClick={toggleDropdown}
                />
                <span className="text-white font-medium">{user.name || 'User'}</span>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md py-2 z-50">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                    <button
                      onClick={() => {
                        Cookies.remove('token');
                        Cookies.remove('userId');
                        Cookies.remove('role');
                        window.location.href = '/';
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
                <Link href="/auth/sign-up">
                  <span className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logofinale.png" alt="Logo" width={40} height={24} />
            <span className="text-white font-bold text-lg">Eventify</span>
          </Link>
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#172B4D] shadow-md z-50 py-2 flex flex-col items-center">
            <Link href="/" className="block text-white font-medium py-2 hover:underline">Home</Link>
            <Link href="/pages/events" className="block text-white font-medium py-2 hover:underline">Events</Link>
            <Link href="/pages/about" className="block text-white font-medium py-2 hover:underline">About</Link>
            <Link href="/pages/contact" className="block text-white font-medium py-2 hover:underline">Contact</Link>
            <div className="flex items-center border rounded-md border-white h-10 max-w-md w-full mx-4 my-2">
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
            {user ? (
              <div className="flex flex-col items-center mt-2">
                <Image
                  src={user.profileImageUrl || '/default-avatar.png'}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full object-cover cursor-pointer"
                  onClick={toggleDropdown}
                />
                <span className="text-white font-medium mt-1">{user.name || 'User'}</span>
                <Link href="/profile" className="block text-white font-medium py-2 hover:underline">Profile</Link>
                <Link href="/settings" className="block text-white font-medium py-2 hover:underline">Settings</Link>
                <button
                  onClick={() => {
                    Cookies.remove('token');
                    Cookies.remove('userId');
                    Cookies.remove('role');
                    window.location.href = '/';
                  }}
                  className="block text-white font-medium py-2 hover:underline text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 mt-2">
                <Link href="/auth/login" className="w-full">
                  <span className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md cursor-pointer block text-center">
                    Login
                  </span>
                </Link>
                <Link href="/auth/signUp" className="w-full">
                  <span className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md cursor-pointer block text-center">
                    Sign Up
                  </span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
