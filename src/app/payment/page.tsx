'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cart = searchParams.get('cart');
  const total = searchParams.get('total');

  const [cartData, setCartData] = useState<{ [key: string]: number }>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    // Parse cart and total from query string
    if (cart && total) {
      setCartData(JSON.parse(cart as string));
      setTotalAmount(parseFloat(total as string));
    }
  }, [cart, total]);

  const handlePayment = () => {
    // Simulate payment processing here (e.g., integrate with payment gateway)
    alert('Pembayaran berhasil!');
    // Redirect to a success page or thank you page
    router.push('/thank-you');
  };

  if (!cart || !total) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <h1 className="text-2xl font-bold mb-6">Halaman Pembayaran</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="w-full lg:w-[300px] space-y-4 h-fit">
            <div className="p-4 border rounded-xl bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Ringkasan Pembelian</h3>
              <p className="text-sm text-gray-700">
                Jumlah Tiket:{' '}
                <span className="font-medium">
                  {Object.values(cartData).reduce((a, b) => a + b, 0)}
                </span>
              </p>
              <p className="text-xl font-bold text-blue-700 mt-1">
                Rp. {totalAmount.toLocaleString('id-ID')}
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={totalAmount === 0}
              className={`w-full py-3 rounded-xl transition text-sm font-semibold ${
                totalAmount === 0
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
