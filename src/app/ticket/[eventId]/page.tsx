'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { EventData, TicketOption } from '@/types/event.model';
import { Calendar, MapPin } from 'lucide-react';

export default function TicketPage({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const eventId = params.eventId;

  const [event, setEvent] = useState<EventData | null>(null);
  const [tickets, setTickets] = useState<TicketOption[]>([]);
  const [cart, setCart] = useState<{ [ticketId: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, ticketsRes] = await Promise.all([
          axios.get(`/api/events/${eventId}`),
          axios.get(`/api/tickets`, { params: { eventId } })
        ]);

        setEvent(eventRes.data);
        setTickets(ticketsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchData();
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
    window.scrollTo({ top: 0 });
    router.push(`/checkout?eventId=${eventId}&cart=${encodeURIComponent(JSON.stringify(cart))}`);
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!event) return <p className="p-6 text-gray-600">Event tidak ditemukan.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#172B4D] to-[#172B4D] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Beli Tiket</h1>
          <p className="text-sm opacity-90 mt-1">Pilih tiket untuk acara favoritmu</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <img
            src={event.imageUrl || '/placeholder.svg'}
            alt={event.namaEvent}
            className="w-full max-w-[970px] h-[250px] rounded-lg object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-black">{event.namaEvent}</h2>
            <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
              <MapPin size={14} /> {event.lokasiEvent}
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <Calendar size={14} /> {event.tanggalEvent}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Tickets */}
          <div className="flex-1 space-y-6">
            {tickets.map(ticket => {
              const discountedPrice = getDiscountedPrice(ticket);
              const formattedPrice = ticket.price.toLocaleString('id-ID');
              const formattedDiscounted = discountedPrice.toLocaleString('id-ID');
              const now = new Date();
              const isNotStarted = ticket.saleStartDate && new Date(ticket.saleStartDate) > now;

              return (
                <div
                  key={ticket.id}
                  className="text-black border rounded-xl p-5 shadow-sm bg-white transition hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-lg font-semibold">{ticket.title}</h2>

                      {!ticket.discountPercentage ? (
                        <p className="text-sm text-gray-600 mt-0.5">
                          Rp {formattedPrice} belum termasuk PPN
                        </p>
                      ) : (
                        <>
                          <div className="mt-1 text-sm text-gray-500">
                            <span className="line-through mr-2">Rp {formattedPrice}</span>
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                              -{ticket.discountPercentage}%
                            </span>
                          </div>
                        </>
                      )}

                      <div className="mt-2 font-bold text-blue-600 text-lg">
                        Rp {formattedDiscounted}
                      </div>

                      {ticket.saleStartDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          {isNotStarted
                            ? `Penjualan dimulai: ${new Date(ticket.saleStartDate).toLocaleString('id-ID')}`
                            : `Penjualan berakhir: ${new Date(ticket.saleEndDate!).toLocaleString('id-ID')}`}
                        </div>
                      )}
                    </div>

                    <div>
                      {isNotStarted ? (
                        <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded font-medium inline-block mt-2 sm:mt-0">
                          Belum dimulai
                        </span>
                      ) : (
                        <select
                          className="border rounded px-3 py-2 text-sm mt-2 sm:mt-0"
                          value={cart[ticket.id] || 0}
                          onChange={e => handleQuantityChange(ticket.id, parseInt(e.target.value))}
                        >
                          {[...Array((ticket.quota ?? 10) + 1).keys()].map(qty => (
                            <option key={qty} value={qty}>
                              {qty} tiket
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Summary */}
          <div className="w-full lg:w-[320px] space-y-4 h-fit">
            <div className="p-5 border rounded-xl bg-white shadow text-black">
              <h3 className="text-lg font-semibold mb-3">Ringkasan</h3>

              {Object.entries(cart).map(([ticketId, qty]) => {
                const ticket = tickets.find(t => t.id === ticketId);
                if (!ticket || qty === 0) return null;
                const price = getDiscountedPrice(ticket);

                return (
                  <div key={ticketId} className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>{ticket.title}</span>
                    <span>
                      {qty} x Rp {price.toLocaleString('id-ID')}
                    </span>
                  </div>
                );
              })}

              <div className="border-t mt-3 pt-3">
                <p className="text-sm text-gray-600">Total Bayar</p>
                <p className="text-xl font-bold text-blue-700">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <button
              disabled={calculateTotal() === 0}
              onClick={handleCheckout}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
                calculateTotal() === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-[#172B4D] hover:bg-blue-900 text-white'
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