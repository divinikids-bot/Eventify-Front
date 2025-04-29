'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { token } = params;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Password tidak cocok. Coba lagi.');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        alert('Password berhasil direset! Silakan login.');
        router.push('/login');
      } else {
        alert('Gagal mereset password. Token mungkin tidak valid.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      alert('Terjadi kesalahan. Coba lagi nanti.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        
        {/* Kiri: Maskot + Teks */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <Image
            src="/images/mascot.png"
            alt="Reset Password Illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h2 className="text-xl text-gray-600 font-semibold">
            Ganti password kamu sekarang!
          </h2>
          <p className="text-gray-600 text-sm max-w-md">
            Masukkan password baru yang lebih kuat untuk menjaga keamanan akunmu.
          </p>
        </div>

        {/* Kanan: Form Reset Password */}
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-auto border">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-gray-700 text-sm mb-1">
                Password Baru
              </label>
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm mb-1">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Reset Password
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Ingat passwordmu?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
