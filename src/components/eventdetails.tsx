'use client';

import { dummyEvents } from '@/app/data/dummy-events';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface EventDetailsProps {
  eventId: string;
  isLoggedIn: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId, isLoggedIn }) => {
  const router = useRouter();
  const event = dummyEvents.find((e) => e.id === eventId);

  if (!event) return notFound();

  const handleBeliTiket = () => {
    if (isLoggedIn) {
      router.push(`/tiket/${eventId}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="hover:underline cursor-pointer">Home</span> &gt;{' '}
        <span className="hover:underline cursor-pointer">Konser</span> &gt;{' '}
        <span className="hover:underline cursor-pointer">Wisata & Liburan</span> &gt;{' '}
        <span className="text-gray-700 font-medium">{event.namaEvent}</span>
      </div>

      {/* Banner */}
      <div className="w-[970px] h-[250px] relative mx-auto rounded-lg overflow-hidden mb-8">
        <Image
          src={event.imageUrl || '/default-image.jpg'}
          alt={event.namaEvent || 'Event Image'}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Deskripsi */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold border-l-4 border-blue-600 pl-2 mb-3">Deskripsi</h2>
          <h3 className="uppercase font-bold text-sm text-gray-500 mb-2">DESCRIPTION</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{event.deskripsiEvent}</p>
        </div>

        {/* Side Card */}
        <div className="w-full lg:w-[300px] space-y-6">
          <div className="bg-white shadow-md rounded-xl p-5 space-y-3 border">
            <h3 className="text-lg font-semibold">{event.namaEvent}</h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaCalendarAlt className="text-blue-600" />
              <span>{event.tanggalEvent}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaClock className="text-blue-600" />
              <span>{event.waktuEvent}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>{event.lokasiEvent}</span>
            </div>
            <hr />
            <p className="text-sm text-gray-500">Diselenggarakan oleh</p>
            <p className="font-semibold text-gray-700">{event.eventOrganizer}</p>
          </div>

          {/* Tombol Beli Tiket */}
          <button
            onClick={handleBeliTiket}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-center text-sm font-semibold hover:bg-blue-700 transition"
          >
            Beli Tiket
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
