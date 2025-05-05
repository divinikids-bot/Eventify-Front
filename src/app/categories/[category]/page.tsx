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
              className="group block bg-white rounded-lg shadow-md p-3 flex flex-col transition-transform hover:scale-105 hover:shadow-lg"
            >
              {/* Gambar */}
              <div className="relative w-full aspect-[3/2] overflow-hidden rounded-md mb-3">
                <Image
                  src={event.imageUrl || '/placeholder.svg'}
                  alt={event.namaEvent || 'Event Image'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Badge */}
              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mb-2 capitalize">
                {normalizedCategory}
              </span>

              {/* Judul */}
              <h2 className="font-semibold text-base text-gray-800 mb-1 line-clamp-2 h-10">
                {event.namaEvent}
              </h2>

              {/* Lokasi */}
              <p className="text-gray-600 text-sm mb-2 line-clamp-1 h-5">
                {event.lokasiEvent}
              </p>

              {/* Tanggal */}
              <div className="mt-auto text-gray-400 text-xs">
                {event.tanggalEvent}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
