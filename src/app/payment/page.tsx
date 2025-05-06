'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState<number>(0);
  const [proofFile, setProofFile] = useState<File | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cartParam = params.get('cart');
    const totalParam = params.get('total');

    if (cartParam && totalParam) {
      setCart(JSON.parse(cartParam));
      setTotal(parseInt(totalParam, 10));
    }
  }, []);

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!proofFile) {
      alert('Silakan unggah bukti pembayaran terlebih dahulu.');
      return;
    }

    // Simulasi submit
    console.log('Bukti pembayaran:', proofFile);
    alert('Pembayaran Anda sedang diproses!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-black max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Ringkasan Pesanan</h2>
          <p className="text-sm text-gray-700">
            Jumlah Tiket: {Object.values(cart).reduce((a, b) => a + b, 0)}
          </p>
          <p className="text-xl font-bold text-blue-700">
            Total Bayar: Rp. {total.toLocaleString('id-ID')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Bukti Pembayaran <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleUploadChange}
              className="block w-full text-sm border border-gray-300 rounded-lg p-2"
              required
            />
            {proofFile && (
              <p className="text-sm text-green-600 mt-1">
                File: {proofFile.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
          >
            Konfirmasi Pembayaran
          </button>
        </form>
      </div>
    </div>
  );
}
