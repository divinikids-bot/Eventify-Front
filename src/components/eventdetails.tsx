'use client';

import { dummyEvents } from '@/data/dummy-events';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface EventDetailsProps {
  eventId: string;
  isLoggedIn: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, isLoggedIn }) => {
  const event = dummyEvents.find((e) => e.id === eventId);

  if (!event) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Gambar dan Informasi Utama */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image src={event.imageUrl || '/default-image.jpg'} alt={event.namaEvent || 'Event Image'} width={600} height={400} className="rounded-lg" />
        </div>
        <div className="md:w-1/2 space-y-4 text-gray-800">
          <h1 className="text-3xl font-bold text-gray-600">{event.namaEvent}</h1>
          <p><strong>Penyelenggara:</strong> {event.eventOrganizer}</p>
          <p><strong>Tanggal:</strong> {event.tanggalEvent}</p>
          <p><strong>Waktu:</strong> {event.waktuEvent}</p>
          <p><strong>Lokasi:</strong> {event.lokasiEvent}</p>
          <p><strong>Harga Tiket:</strong> Rp{(event.hargaEvent ?? 0).toLocaleString('id-ID')}</p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Beli Tiket
          </button>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2 text-gray-600">Deskripsi</h2>
        <p>{event.deskripsiEvent}</p>
      </div>
    </div>
  );
};

export default EventDetails;
