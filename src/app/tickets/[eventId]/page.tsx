"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { dummyEvents } from "@/app/data/dummy-events";
import { dummyTickets } from "@/app/";

function formatRupiah(num: number) {
  return "Rp" + num.toLocaleString("id-ID");
}

export default function TicketPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = dummyEvents.find(e => e.id === eventId);
  const tickets = dummyTickets.filter(t => t.eventId === eventId);

  const [quantities, setQuantities] = useState<{ [ticketId: string]: number }>({});

  const handleQuantityChange = (ticketId: string, qty: number) => {
    setQuantities(q => ({ ...q, [ticketId]: qty }));
  };

  const total = tickets.reduce(
    (sum, t) => sum + (quantities[t.id] || 0) * t.price,
    0
  );

  if (!event) return <div className="p-8">Event not found.</div>;

  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      {/* Banner */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-6">
        <span className="text-2xl font-bold">{event.namaEvent}</span>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-2">{event.namaEvent}</h2>
        <p className="mb-6 text-gray-600">{event.deskripsiEvent}</p>
        {/* Ticket Options */}
        <div>
          <h3 className="font-semibold mb-4">Tickets</h3>
          {tickets.length === 0 && (
            <div className="text-gray-500 mb-4">No tickets available for this event.</div>
          )}
          {tickets.map(ticket => (
            <div key={ticket.id} className="border rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="font-semibold">{ticket.title}</div>
                {ticket.saleEndDate && (
                  <div className="text-xs text-blue-600 mb-2">
                    Sales end: {new Date(ticket.saleEndDate).toLocaleString("id-ID")}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-red-600">{formatRupiah(ticket.price)}</span>
                  {ticket.discountPercentage && ticket.discountPercentage > 0 && (
                    <>
                      <span className="line-through text-gray-400">
                        {formatRupiah(Math.round(ticket.price / (1 - ticket.discountPercentage / 100)))}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                        -{ticket.discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                {ticket.description && (
                  <div className="text-sm text-gray-600 mt-1">{ticket.description}</div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <input
                  type="number"
                  min={0}
                  max={ticket.quota ?? 10}
                  value={quantities[ticket.id] || 0}
                  onChange={e => handleQuantityChange(ticket.id, Math.max(0, Math.min(ticket.quota ?? 10, Number(e.target.value))))}
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Order Summary */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div>
            <div className="font-semibold">Selected tickets will be listed here</div>
            <div className="text-gray-600 text-sm">
              Total ({Object.values(quantities).reduce((a, b) => a + b, 0)} tickets)
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="font-bold text-xl">{formatRupiah(total)}</span>
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}