import { useEffect, useState } from 'react';
import { Ticket } from '@/types/ticket';
import { getUserTickets } from '@/app/services/ticketservice';
import Navbar from '../component/navbar';

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserTickets()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  const filteredTickets = tickets.filter(t => t.status === activeTab);

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar/>
      <h1 className="text-xl font-semibold mb-4">Tiket Saya</h1>

      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`py-2 px-4 ${activeTab === 'active' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('active')}
        >
          Event Aktif
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'past' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('past')}
        >
          Event Lalu
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <div className="text-5xl mb-4">🎟️</div>
          <p className="mb-2">Kamu belum memiliki tiket, silakan membeli tiket terlebih dahulu.</p>
          <a href="/events" className="text-blue-600 hover:underline">Cari Event Sekarang</a>
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredTickets.map(ticket => (
            <li key={ticket.id} className="p-4 border rounded shadow-sm">
              <h2 className="font-medium">{ticket.eventName}</h2>
              <p className="text-sm text-gray-500">{ticket.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
