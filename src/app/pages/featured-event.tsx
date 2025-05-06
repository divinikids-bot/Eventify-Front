"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { api } from "../lib/axios";

export interface EventData {
  id: string;
  namaEvent: string;
  tanggalEvent: string;
  hargaEvent?: number;
  imageUrl?: string;
  eventOrganizer: string;
  organizer?: {
    image: string;
  };
}

export default function EventPilihan() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        // Cek apakah `response.data.data` adalah array
        const fetchedData = response.data.data;
        if (Array.isArray(fetchedData)) {
          setEvents(fetchedData);
        } else {
          console.error("Unexpected format:", fetchedData);
        }
      } catch (err) {
        console.error("Gagal fetch data event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <h2 className="text-2xl text-gray-600 font-bold mb-6">Event Pilihan</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} className="h-auto">
            <Link
              href={`/pages/events/${event.id}`}
              className="block h-full px-2"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-300 hover:shadow-xl transition duration-300">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.namaEvent}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg text-gray-600 font-semibold truncate">
                      {event.namaEvent}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {event.tanggalEvent}
                    </p>
                    {event.hargaEvent !== undefined && (
                      <p className="text-base text-gray-600 font-bold mt-2">
                        Rp{event.hargaEvent.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-2 border-t">
                    <Image
                      src={event.organizer?.image || "/placeholder.svg"}
                      alt={event.eventOrganizer || "Event Organizer"}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700 truncate">
                      {event.eventOrganizer}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
