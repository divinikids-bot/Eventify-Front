'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('Reset password request for:', email);

      // Kirim request ke API reset password
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Redirect ke page reset sent
        router.push('/forgot-password/sent');
      } else {
        alert('Gagal mengirim email reset password. Coba lagi.');
      }
    } catch (error) {
      console.error('Error sending reset request:', error);
      alert('Terjadi kesalahan. Coba lagi nanti.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        
        {/* Kiri: Ilustrasi */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <Image
            src="/images/mascot.png"
            alt="Forgot Password Illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h2 className="text-xl text-center text-gray-600 font-semibold">
            Jangan panik, kami bantu reset password kamu. 
            Masukkan email terdaftar untuk mendapatkan link reset password.
          </h2>
        </div>

        {/* Kanan: Form */}
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-auto border">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Lupa Password
          </h2>
          <p className="text-center text-gray-600 font-bold mb-8 text-sm">
            Kami akan mengirimkan link reset ke email kamu
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="masukkan email"
              />
            </div>

            {/* Submit */}
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
            <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
