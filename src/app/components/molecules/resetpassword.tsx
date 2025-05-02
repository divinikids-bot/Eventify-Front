'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Resetting password:', { password, confirmPassword });
    // TODO: Submit ke backend untuk update password
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Kiri: Maskot + teks */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <Image
            src="/images/mascot.png"
            alt="Reset Password Illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h2 className="text-xl text-gray-600 font-semibold">
            Ganti password kamu dengan yang baru
          </h2>
          <p className="text-gray-600 text-sm max-w-md">
            Masukkan password baru untuk mengakses Eventify kembali.
          </p>
        </div>

        {/* Kanan: Form Reset Password */}
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-auto border">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Buat password baru untuk akun kamu
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password baru */}
            <div>
              <label className="block text-gray-700 text-sm mb-1" htmlFor="password">
                Password Baru
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password Baru"
              />
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-gray-700 text-sm mb-1" htmlFor="confirmPassword">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Konfirmasi Password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Simpan Password Baru
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Kembali ke{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
