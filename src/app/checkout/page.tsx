'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dummyTickets, TicketOption } from '@/app/data/dummy-ticket';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [tickets, setTickets] = useState<TicketOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const queryCart = new URLSearchParams(window.location.search).get('cart');
    if (queryCart) {
      const parsedCart = JSON.parse(decodeURIComponent(queryCart));
      setCart(parsedCart);

      const eventId = new URLSearchParams(window.location.search).get('eventId');
      if (eventId) {
        const filtered = dummyTickets.filter((ticket) => ticket.eventId === eventId);
        setTickets(filtered);
      }
    }
    setLoading(false);
  }, []);

  const getDiscountedPrice = (ticket: TicketOption) => {
    if (ticket.discountPercentage && ticket.discountPercentage > 0) {
      return ticket.price * (1 - ticket.discountPercentage / 100);
    }
    return ticket.price;
  };

  const calculateTotal = () => {
    return tickets.reduce((total, ticket) => {
      const quantity = cart[ticket.id] ?? 0;
      const price = getDiscountedPrice(ticket);
      return total + quantity * price;
    }, 0);
  };

  const handlePayment = () => {
    const paymentData = {
      cart,
      total: calculateTotal(),
    };
    const queryParams = new URLSearchParams({
      cart: JSON.stringify(paymentData.cart),
      total: paymentData.total.toString(),
    }).toString();
    router.push(`/payment?${queryParams}`);
  };

  if (loading) return <p>Loading...</p>;

  const selectedTickets = tickets.filter((ticket) => cart[ticket.id] && cart[ticket.id] > 0);

  if (selectedTickets.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Tidak ada tiket yang dipilih.</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6 bg-white">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {selectedTickets.map((ticket) => {
              const discounted = getDiscountedPrice(ticket);
              const quantity = cart[ticket.id];

              return (
                <div
                  key={ticket.id}
                  className="text-black border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white"
                >
                  <div>
                    <h2 className="text-lg font-semibold">{ticket.title}</h2>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                    {ticket.saleEndDate && (
                      <p className="text-xs text-blue-600">
                        Penjualan berakhir: {new Date(ticket.saleEndDate).toLocaleString('id-ID')}
                      </p>
                    )}
                    <div className="mt-1 text-red-600 font-semibold">
                      {ticket.discountPercentage ? (
                        <>
                          Rp. {discounted.toLocaleString('id-ID')}{' '}
                          <span className="line-through text-sm text-gray-400 ml-1">
                            Rp. {ticket.price.toLocaleString('id-ID')}
                          </span>{' '}
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
                            -{ticket.discountPercentage}%
                          </span>
                        </>
                      ) : (
                        <>Rp. {ticket.price.toLocaleString('id-ID')}</>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">Jumlah: {quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[300px] space-y-4 h-fit">
            <div className="p-4 border rounded-xl bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Ringkasan</h3>
              <p className="text-sm text-gray-700">
                Jumlah Tiket:{' '}
                <span className="font-medium">
                  {Object.values(cart).reduce((a, b) => a + b, 0)}
                </span>
              </p>
              <p className="text-xl font-bold text-blue-700 mt-1">
                Rp. {calculateTotal().toLocaleString('id-ID')}
              </p>
            </div>
            <button
              onClick={handlePayment}
              disabled={calculateTotal() === 0}
              className={`w-full py-3 rounded-xl transition text-sm font-semibold ${
                calculateTotal() === 0
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
