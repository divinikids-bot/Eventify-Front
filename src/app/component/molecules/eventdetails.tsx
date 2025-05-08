// component/molecules/eventdetails.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { EventCreatePayload } from '@/types/event.model';

interface EventDetailsProps {
  event: EventCreatePayload;
  isLoggedIn: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, isLoggedIn }) => {
  const router = useRouter();

  const handleBeliTiket = () => {
    if (isLoggedIn) {
      router.push(`/ticket/${event.eventId}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="hover:underline cursor-pointer">Home</span> &gt;{' '}
        <span className="hover:underline cursor-pointer">{event.categoryEvents}</span> &gt;{' '}
        <span className="text-gray-700 font-medium">{event.nameEvents}</span>
      </div>

      {/* Banner */}
      <div className="w-[970px] h-[250px] relative mx-auto rounded-lg overflow-hidden mb-8">
        <Image
          src={event.imgUrl || '/placeholder.png'}
          alt={event.nameEvents}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Deskripsi */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold border-l-4 border-blue-600 pl-2 mb-3">Deskripsi</h2>
          <h3 className="uppercase font-bold text-sm text-gray-500 mb-2">DESCRIPTION</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {event.descriptionEvents}
          </p>
        </div>

        {/* Side Card */}
        <div className="w-full lg:w-[300px] space-y-6">
          <div className="bg-white shadow-md rounded-xl p-5 space-y-3 border">
            <h3 className="text-lg font-semibold">{event.nameEvents}</h3>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaCalendarAlt className="text-blue-600" />
              <span>{new Date(event.startDateEvents).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaClock className="text-blue-600" />
              <span>{new Date(event.startDateEvents).toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>{event.locationEvents}</span>
            </div>
            <hr />
            <p className="text-sm text-gray-500">Diselenggarakan oleh</p>
            <p className="font-semibold text-gray-700">Promotor ID {event.promotorId}</p>
          </div>

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
