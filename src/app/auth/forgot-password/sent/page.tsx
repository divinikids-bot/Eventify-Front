'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ResetLinkSentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Kiri: Maskot */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <Image
            src="/images/mascot.png"
            alt="Reset Link Sent Illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h2 className="text-xl text-gray-600 font-semibold">
            Link reset password telah dikirim!
          </h2>
          <p className="text-gray-600 text-sm max-w-md">
            Cek inbox email kamu, dan klik link untuk mengganti password.
          </p>
        </div>

        {/* Kanan: Info */}
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-auto border text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Cek Email Kamu
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Kami telah mengirimkan link reset password ke email kamu. 
            Jika tidak menemukan, coba cek folder spam/junk.
          </p>

          <Link href="/login">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
              Kembali ke Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
