'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dummyTickets, TicketOption } from '@/app/data/dummy-ticket';
import { dummyEvents, EventData } from '@/app/data/dummy-events';

export default function TicketPage({ params }: { params: { eventId: string } }) {
  const eventId = params.eventId;
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketOption[]>([]);
  const [cart, setCart] = useState<{ [ticketId: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventData | null>(null);

  useEffect(() => {
    if (eventId) {
      const filtered = dummyTickets.filter(ticket => ticket.eventId === eventId);
      setTickets(filtered);

      const foundEvent = dummyEvents.find(e => e.id === eventId);
      setEvent(foundEvent || null);

      setLoading(false);
    }
  }, [eventId]);

  const getDiscountedPrice = (ticket: TicketOption) => {
    if (ticket.discountPercentage && ticket.discountPercentage > 0) {
      return ticket.price * (1 - ticket.discountPercentage / 100);
    }
    return ticket.price;
  };

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setCart(prev => ({ ...prev, [ticketId]: quantity }));
  };

  const calculateTotal = () => {
    return tickets.reduce((total, ticket) => {
      const quantity = cart[ticket.id] || 0;
      const price = getDiscountedPrice(ticket);
      return total + quantity * price;
    }, 0);
  };

  const handleCheckout = () => {
    router.push(`/checkout?eventId=${eventId}&cart=${encodeURIComponent(JSON.stringify(cart))}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-black">ONLINE SALES</h1>

        {/* Event Info */}
        {event && (
          <div className="flex items-center gap-4 mb-8">
            <img
              src={event.imageUrl || '/placeholder.svg'}
              alt={event.namaEvent}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-black">{event.namaEvent}</h2>
              <p className="text-sm text-gray-600">{event.lokasiEvent}</p>
              <p className="text-sm text-gray-600">{event.tanggalEvent}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Ticket Options */}
          <div className="flex-1 space-y-6">
            {tickets.map(ticket => {
              const discountedPrice = getDiscountedPrice(ticket);
              const now = new Date();
              const isNotStarted = ticket.saleStartDate && new Date(ticket.saleStartDate) > now;

              return (
                <div
                  key={ticket.id}
                  className="text-black border rounded-xl p-4 shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-black">{ticket.title}</h2>
                    <p className="text-sm text-gray-600">
                      Rp. {ticket.price.toLocaleString('id-ID')} belum termasuk PPN
                    </p>

                    {ticket.saleStartDate && isNotStarted && (
                      <p className="text-xs text-blue-600 mt-1">
                        Penjualan dimulai pada{' '}
                        {new Date(ticket.saleStartDate).toLocaleString('id-ID')}
                      </p>
                    )}
                    {ticket.saleEndDate && !isNotStarted && (
                      <p className="text-xs text-blue-600 mt-1">
                        Penjualan berakhir pada{' '}
                        {new Date(ticket.saleEndDate).toLocaleString('id-ID')}
                      </p>
                    )}

                    <div className="mt-2 text-lg font-bold text-black">
                      Rp. {discountedPrice.toLocaleString('id-ID')}
                    </div>

                    {(ticket.discountPercentage ?? 0) > 0 && (
                      <div className="text-sm text-gray-500">
                        <span className="line-through mr-2">
                          Rp. {ticket.price.toLocaleString('id-ID')}
                        </span>
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">
                          -{ticket.discountPercentage}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 sm:mt-0 flex items-center gap-3">
                    {isNotStarted ? (
                      <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded font-medium">
                        Belum dimulai
                      </span>
                    ) : (
                      <select
                        className="border rounded px-3 py-2"
                        value={cart[ticket.id] || 0}
                        onChange={e => handleQuantityChange(ticket.id, parseInt(e.target.value))}
                      >
                        {[...Array((ticket.quota ?? 10) + 1).keys()].map(qty => (
                          <option key={qty} value={qty}>
                            {qty}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full lg:w-[320px] space-y-4 h-fit">
            <div className="p-4 border rounded-xl bg-white shadow-sm text-black">
              <h3 className="text-lg font-semibold mb-3">Ringkasan</h3>

              {Object.entries(cart).map(([ticketId, qty]) => {
                const ticket = tickets.find(t => t.id === ticketId);
                if (!ticket || qty === 0) return null;

                const price = getDiscountedPrice(ticket);

                return (
                  <div key={ticketId} className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>{ticket.title}</span>
                    <span>
                      {qty} tiket x Rp{price.toLocaleString('id-ID')}
                    </span>
                  </div>
                );
              })}

              <div className="border-t mt-3 pt-3">
                <p className="text-sm text-gray-700">Jumlah (Total Tiket)</p>
                <p className="text-xl font-bold text-blue-700">
                  Rp{calculateTotal().toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <button
              disabled={calculateTotal() === 0}
              onClick={handleCheckout}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
                calculateTotal() === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
