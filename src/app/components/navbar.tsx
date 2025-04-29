'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch) {
      console.log('Search triggered:', debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term!');
      return;
    }
    console.log('Manual Search triggered:', searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#172B4D] px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {/* Left: Logo + Brand + Search */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Image 
                src="/logofinale.png" 
                alt="Eventify Logo" 
                width={50} 
                height={30} 
              />
              <div className="text-white font-bold text-lg">Eventify</div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center border border-[#172B4D] rounded-md overflow-hidden bg-[#1B2A49] h-10 flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-4 pr-2 bg-[#1B2A49] text-white placeholder-gray-400 text-sm h-full focus:outline-none w-full"
              />
              <button 
                type="button" 
                onClick={handleSearch}
                className="bg-[#2962FF] hover:bg-[#1E50E4] h-full px-4 flex items-center justify-center"
              >
                <Search size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Right: Navigation Links + Auth Buttons */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-white font-medium hover:underline">Home</Link>
              <Link href="/events" className="text-white font-medium hover:underline">Events</Link>
              <Link href="/about" className="text-white font-medium hover:underline">About</Link>
              <Link href="/contact" className="text-white font-medium hover:underline">Contact</Link>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <span className="bg-yellow-400 hover:bg-yellow-500 text-gray-100 font-semibold px-4 py-2 rounded-md cursor-pointer">
                  Login
                </span>
              </Link>
              <Link href="/auth/sign-up">
                <span className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/logofinale.png" 
              alt="Eventify Logo" 
              width={40} 
              height={24} 
            />
            <div className="text-white font-bold text-lg">Eventify</div>
          </div>

          <button 
            onClick={toggleMobileMenu}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {/* Mobile Search */}
            <div className="flex items-center border border-[#172B4D] rounded-md overflow-hidden bg-[#1B2A49] h-10">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-4 pr-2 bg-[#1B2A49] text-white placeholder-gray-400 text-sm h-full focus:outline-none flex-1"
              />
              <button 
                type="button" 
                onClick={handleSearch}
                className="bg-[#2962FF] hover:bg-[#1E50E4] h-full px-4 flex items-center justify-center"
              >
                <Search size={18} className="text-white" />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-white font-medium hover:underline py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/events" 
                className="text-white font-medium hover:underline py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/about" 
                className="text-white font-medium hover:underline py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-white font-medium hover:underline py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 pt-2">
              <Link 
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="block text-center bg-yellow-400 hover:bg-yellow-500 text-gray-100 font-semibold px-4 py-2 rounded-md cursor-pointer">
                  Login
                </span>
              </Link>
              <Link 
                href="/auth/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="block text-center bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}