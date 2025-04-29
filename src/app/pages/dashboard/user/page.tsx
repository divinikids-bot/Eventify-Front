'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UserDashboard() {
  const [userData, setUserData] = useState({
    id: 'USR123456',
    name: 'John Doe',
    email: 'john@example.com',
    profilePhoto: '/images/default-profile.png', // default profile photo
  });

  const [newName, setNewName] = useState(userData.name);
  const [newPassword, setNewPassword] = useState('');
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  
  const [purchasedTickets, setPurchasedTickets] = useState([
    { id: 'TICKET001', event: 'Concert A', date: '2025-06-15' },
    { id: 'TICKET002', event: 'Festival B', date: '2025-07-20' },
  ]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
      // Optional: langsung preview foto
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setUserData(prev => ({ ...prev, profilePhoto: reader.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', { newName, newPassword, newPhoto });

    // TODO: Integrasi ke backend buat update data user

    setUserData(prev => ({
      ...prev,
      name: newName,
      // biasanya email tetap ga diubah di dashboard ya
    }));

    alert('Perubahan disimpan!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Pengguna</h1>

        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <Image
              src={userData.profilePhoto}
              alt="Profile Photo"
              width={120}
              height={120}
              className="rounded-full object-cover border"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
              <input type="file" className="hidden" onChange={handlePhotoChange} />
              ✏️
            </label>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{userData.name}</h2>
            <p className="text-gray-500 text-sm">ID: {userData.id}</p>
          </div>
        </div>

        {/* Update Section */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 text-gray-700"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password Baru</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 text-gray-700"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Simpan Perubahan
          </button>
        </div>

        {/* Purchased Tickets */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tiket yang Dibeli</h3>
          <div className="space-y-4">
            {purchasedTickets.length > 0 ? (
              purchasedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border p-4 rounded-lg flex justify-between items-center shadow-sm bg-gray-100"
                >
                  <div>
                    <p className="font-semibold">{ticket.event}</p>
                    <p className="text-gray-500 text-sm">{ticket.date}</p>
                  </div>
                  <span className="text-gray-700 text-xs">ID Tiket: {ticket.id}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Belum ada tiket yang dibeli.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
