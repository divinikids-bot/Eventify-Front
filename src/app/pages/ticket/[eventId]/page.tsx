// pages/ticket/[eventId]/page.tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { dummyTickets, TicketOption } from '@/app/data/dummy-ticket';

export default function TicketPage() {
  const router = useRouter();
  const { eventId } = router.query;
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [tickets, setTickets] = useState<TicketOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch ticket data based on eventId
  useEffect(() => {
    if (eventId) {
      const filteredTickets = dummyTickets.filter((ticket) => ticket.eventId === eventId);
      setTickets(filteredTickets);
      setLoading(false);
    }
  }, [eventId]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state while data is fetching
  }

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setCart((prev) => ({ ...prev, [ticketId]: quantity }));
  };

  const getDiscountedPrice = (ticket: TicketOption) => {
    if (ticket.discountPercentage && ticket.discountPercentage > 0) {
      return ticket.price * (1 - ticket.discountPercentage / 100);
    }
    return ticket.price;
  };

  const calculateTotal = () => {
    return tickets.reduce((total, ticket) => {
      const quantity = cart[ticket.id] || 0;
      const discountedPrice = getDiscountedPrice(ticket);
      return total + discountedPrice * quantity;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Pertamina Grand Prix of Indonesia 2025
      </h1>

      <div className="space-y-6">
        {tickets.map((ticket) => {
          const discountedPrice = getDiscountedPrice(ticket);

          return (
            <div
              key={ticket.id}
              className="border rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{ticket.title}</h2>
                <p className="text-sm text-gray-600">{ticket.description}</p>
                {ticket.saleEndDate && (
                  <p className="text-xs text-blue-600">
                    Penjualan berakhir pada{' '}
                    {new Date(ticket.saleEndDate).toLocaleString('id-ID')}
                  </p>
                )}
                <div className="mt-1 text-red-600 font-semibold">
                  {discountedPrice ? (
                    <>
                      Rp. {discountedPrice.toLocaleString('id-ID')}{' '}
                      <span className="line-through text-gray-400 text-sm ml-1">
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
              </div>

              <div className="flex items-center space-x-2">
                <select
                  className="border rounded px-2 py-1"
                  value={cart[ticket.id] || 1} // Default to 1 ticket
                  onChange={(e) =>
                    handleQuantityChange(ticket.id, parseInt(e.target.value))
                  }
                >
                  {[...Array(ticket.quota ?? 10).keys()].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 border rounded-xl bg-gray-50 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">
            Jumlah Tiket: {Object.values(cart).reduce((a, b) => a + b, 0)}
          </p>
          <p className="text-xl font-bold text-blue-700">
            Rp. {calculateTotal().toLocaleString('id-ID')}
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
}
