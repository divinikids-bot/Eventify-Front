// app/categories/[category]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/app/lib/axios';

const VALID_CATEGORIES = ['MUSIC', 'SPORTS', 'Food', 'BEAUTY'];

interface Event {
  eventId: number;
  promotorId: number;
  nameEvents: string;
  categoryEvents: string;
  imgUrl?: string;
  locationEvents: string;
  startDateEvents: string;
  endDateEvents: string;
  AvaibleSeats: number;
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const normalizedCategory = category.toLowerCase();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validate category
    if (!VALID_CATEGORIES.includes(normalizedCategory)) {
      notFound();
      return;
    }

    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?category=${normalizedCategory}`
        );
        setEvents(res.data);
      } catch (error) {
        console.error('Failed to fetch events by category:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [normalizedCategory]);

  if (!VALID_CATEGORIES.includes(normalizedCategory)) {
    return notFound();
  }

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 capitalize">
        Kategori: {normalizedCategory}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">
            Belum ada event untuk kategori “{normalizedCategory}”.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.eventId}
              href={`/events/${event.eventId}`}
              className="group block bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition duration-300"
            >
              {/* Gambar Event */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={event.imgUrl || '/placeholder.svg'}
                  alt={event.nameEvents}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Detail Event */}
              <div className="p-3 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-base text-gray-600 font-semibold truncate">
                    {event.nameEvents}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(event.startDateEvents).toLocaleDateString()} -{' '}
                    {new Date(event.endDateEvents).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{event.locationEvents}</p>
                </div>

                <div className="mt-3 pt-2 text-xs text-gray-500 border-t">
                  Seats Available: {event.AvaibleSeats}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
