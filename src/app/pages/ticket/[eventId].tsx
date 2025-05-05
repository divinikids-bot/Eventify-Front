// pages/tickets/[eventId].tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import { dummyTickets, TicketOption } from '@/app/data/dummy-ticket';

export default function TicketPage() {
  const router = useRouter();
  const { eventId } = router.query;
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const tickets = dummyTickets.filter((t) => t.eventId === eventId);

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setCart((prev) => ({ ...prev, [ticketId]: quantity }));
  };

  const calculateTotal = () =>
    tickets.reduce((total, ticket) => {
      const quantity = cart[ticket.id] || 0;
      const discount = ticket.discountPercentage
        ? ticket.price * (ticket.discountPercentage / 100)
        : 0;
      return total + (ticket.price - discount) * quantity;
    }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Pertamina Grand Prix of Indonesia 2025
      </h1>

      <div className="space-y-6">
        {tickets.map((ticket) => {
          const discountedPrice =
            ticket.discountPercentage && ticket.discountPercentage > 0
              ? ticket.price * (1 - ticket.discountPercentage / 100)
              : null;

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
                  value={cart[ticket.id] || 0}
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
