'use client';

import { useState, useEffect } from 'react';
import { api } from '@/app/lib/axios';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import AuthMenu from './authMenu.module';
import GuestMenu from './guestMenu.module';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { data: session, status } = useSession();

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return alert('Please enter a search term!');
    console.log('Searching for:', searchTerm);
  };

  return (
    <nav className="bg-[#172B4D] px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logofinale.png" alt="Eventify Logo" width={40} height={24} priority />
          <span className="text-white font-bold text-lg">Eventify</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:block w-full max-w-md mx-4">
          <div className="flex items-center border rounded-md border-white h-10 bg-white/10">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-2 bg-transparent text-white placeholder-gray-300 text-sm h-full focus:outline-none w-full"
            />
            <button type="submit" className="px-4 text-white hover:bg-white/10">
              <Search size={18} />
            </button>
          </div>
        </form>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white hover:underline">Home</Link>
          <Link href="/pages/events" className="text-white hover:underline">Events</Link>
          <Link href="/pages/about" className="text-white hover:underline">About</Link>
          <Link href="/pages/contact" className="text-white hover:underline">Contact</Link>

          {status === 'authenticated' ? (
            <AuthMenu session={session} toggleDropdown={() => setDropdownOpen(!dropdownOpen)} dropdownOpen={dropdownOpen} />
          ) : (
            <GuestMenu />
          )}
        </div>
      </div>
    </nav>
  );
}