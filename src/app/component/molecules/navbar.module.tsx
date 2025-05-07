'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

  // Close dropdown when clicking outside
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
    // Add your search logic here
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-[#172B4D] px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Image 
                src="/logofinale.png" 
                alt="Eventify Logo" 
                width={50} 
                height={30} 
                priority
              />
              <span className="text-white font-bold text-lg">Eventify</span>
            </Link>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="flex items-center border rounded-md border-white h-10 bg-white/10 backdrop-blur-sm">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-2 bg-transparent text-white placeholder-gray-300 text-sm h-full focus:outline-none w-full"
                  aria-label="Search events"
                />
                <button
                  type="submit"
                  className="h-full px-4 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  aria-label="Search button"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-white font-medium hover:text-yellow-400 transition-colors">Home</Link>
            <Link href="/events" className="text-white font-medium hover:text-yellow-400 transition-colors">Events</Link>
            <Link href="/pages/about" className="text-white font-medium hover:text-yellow-400 transition-colors">About</Link>
            <Link href="/pages/contact" className="text-white font-medium hover:text-yellow-400 transition-colors">Contact</Link>

            {status === 'authenticated' ? (
              <div className="relative dropdown-container">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 focus:outline-none"
                  aria-expanded={dropdownOpen}
                  aria-label="User menu"
                >
                  <Image
                    src={session.user?.image || '/default-avatar.png'}
                    alt="User profile"
                    width={36}
                    height={36}
                    className="rounded-full cursor-pointer object-cover border-2 border-white/50 hover:border-yellow-400 transition-colors"
                  />
                  <span className="text-white font-medium">{session.user?.name || 'User'}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/settings" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <span className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md cursor-pointer transition-colors">
                    Login
                  </span>
                </Link>
                <Link href="/auth/signUp">
                  <span className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md cursor-pointer transition-colors">
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
            <Image 
              src="/logofinale.png" 
              alt="Eventify Logo" 
              width={40} 
              height={24} 
              priority
            />
            <span className="text-white font-bold text-lg">Eventify</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMobileMenu} 
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#172B4D] z-40 pt-20 px-4 pb-6 flex flex-col items-center space-y-4">
            <form onSubmit={handleSearch} className="w-full max-w-xs">
              <div className="flex items-center border rounded-md border-white h-10 bg-white/10 backdrop-blur-sm">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 pr-2 bg-transparent text-white placeholder-gray-300 text-sm h-full focus:outline-none w-full"
                  aria-label="Search events"
                />
                <button
                  type="submit"
                  className="h-full px-4 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  aria-label="Search button"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            <Link 
              href="/" 
              className="block text-white font-medium py-2 hover:text-yellow-400 transition-colors w-full text-center"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/events" 
              className="block text-white font-medium py-2 hover:text-yellow-400 transition-colors w-full text-center"
              onClick={toggleMobileMenu}
            >
              Events
            </Link>
            <Link 
              href="/pages/about" 
              className="block text-white font-medium py-2 hover:text-yellow-400 transition-colors w-full text-center"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link 
              href="/pages/contact" 
              className="block text-white font-medium py-2 hover:text-yellow-400 transition-colors w-full text-center"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>

            {status === 'authenticated' ? (
              <div className="flex flex-col items-center mt-4 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src={session.user?.image || '/default-avatar.png'}
                    alt="User profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-white/50"
                  />
                  <span className="text-white font-medium">{session.user?.name || 'User'}</span>
                </div>
                <Link 
                  href="/profile" 
                  className="block text-white font-medium py-2 hover:text-yellow-400 transition-colors w-full text-center"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <Link 
                  href="/settings" 
                  className="block text-white font-medium py-2 hover:text-yellow-400 transition-colors w-full text-center"
                  onClick={toggleMobileMenu}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    toggleMobileMenu();
                  }}
                  className="block text-white font-medium py-2 hover:text-red-400 transition-colors w-full text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xs">
                <Link 
                  href="/auth/login" 
                  className="w-full"
                  onClick={toggleMobileMenu}
                >
                  <span className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md cursor-pointer block text-center transition-colors">
                    Login
                  </span>
                </Link>
                <Link 
                  href="/auth/signUp" 
                  className="w-full"
                  onClick={toggleMobileMenu}
                >
                  <span className="bg-white hover:bg-gray-100 text-black font-semibold px-4 py-2 rounded-md cursor-pointer block text-center transition-colors">
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