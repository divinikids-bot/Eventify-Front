'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavbarAfterLogin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Simulasi user data
  const user = {
    name: 'John Doe',
    profilePhoto: '/images/default-profile.png', // bisa ganti ke foto user
    purchasedTickets: [
      { id: '1', eventName: 'Concert A' },
      { id: '2', eventName: 'Festival B' },
    ],
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Eventify
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Events */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            🎟️ Tiket Saya
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              {user.purchasedTickets.length > 0 ? (
                user.purchasedTickets.map((ticket) => (
                  <div key={ticket.id} className="px-4 py-2 hover:bg-gray-100">
                    {ticket.eventName}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">Belum ada tiket</div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2"
          >
            <Image
              src={user.profilePhoto}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="text-gray-700">{user.name}</span>
          </button>
          {/* Dropdown untuk profile (optional) */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <Link href="/pages/dashboard/user" className="block px-4 py-2 hover:bg-gray-100">
                Dashboard
              </Link>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
