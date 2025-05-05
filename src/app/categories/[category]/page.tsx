// app/categories/[category]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { dummyEvents } from '@/app/data/dummy-events';

const VALID_CATEGORIES = ['music', 'sport', 'food', 'beauty'];

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // Optional: Make case-insensitive
  const normalizedCategory = category.toLowerCase();
  if (!VALID_CATEGORIES.includes(normalizedCategory)) return notFound();

  const events = dummyEvents.filter((event) => event.kategori === normalizedCategory);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 capitalize">
        Kategori: {normalizedCategory}
      </h1>

      {events.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">
            Belum ada event untuk kategori “{normalizedCategory}”.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group block bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition duration-300"
            >
              {/* Gambar */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={event.imageUrl || '/placeholder.svg'}
                  alt={event.namaEvent}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Detail Konten */}
              <div className="p-3 flex flex-col justify-between flex-grow">
                <div>
                  {/* Nama Event */}
                  <h3 className="text-base text-gray-600 font-semibold truncate">
                    {event.namaEvent}
                  </h3>

                  {/* Tanggal Event */}
                  <p className="text-xs text-gray-500">{event.tanggalEvent}</p>

                  {/* Harga Event */}
                  {event.hargaEvent !== undefined && (
                    <p className="text-sm text-gray-600 font-bold mt-2">
                      Rp{event.hargaEvent.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Organizer */}
                <div className="flex items-center mt-3 pt-2 border-t border-gray-200">
                  <Image
                    src={event.organizer?.image || '/placeholder.svg'}
                    alt={event.eventOrganizer || 'Event Organizer'}
                    width={26}
                    height={26}
                    className="rounded-full mr-2 object-cover"
                  />
                  <span className="text-xs text-gray-700 truncate">
                    {event.eventOrganizer}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
