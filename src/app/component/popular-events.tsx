import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { api } from "../lib/axios";
import { EventCreatePayload } from "@/types/event.model";

export default function PopularEvents() {
  const [events, setEvents] = useState<EventCreatePayload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events"); // sesuaikan dengan endpoint backend kamu
        if (Array.isArray(response.data.data)) {
          setEvents(response.data.data); // Simpan data jika berupa array
        } else {
          console.error("Data yang diterima tidak sesuai:", response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">
        Event Populer
      </h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {events.map((event: EventCreatePayload) => (
          <SwiperSlide key={event.eventId} className="flex justify-center">
            <Link
              href={`/pages/events/${event.eventId}`}
              className="block w-full px-2"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-300 hover:shadow-lg transition duration-300">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={event.imgUrl || "/placeholder.svg"} // pastikan imgUrl valid
                    alt={event.nameEvents}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base text-gray-600 font-semibold truncate">
                      {event.nameEvents}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {event.startDateEvents}
                    </p>
                    {event.priceEvents && (
                      <p className="text-sm text-gray-600 font-bold mt-2">
                        Rp{event.priceEvents.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center mt-3 pt-2 border-t">
                    <Image
                      src={event.promotor?.image || "/placeholder.svg"}
                      alt={event.promotor?.name || "Event Organizer"}
                      width={26}
                      height={26}
                      className="rounded-full mr-2 object-cover"
                    />
                    <span className="text-xs text-gray-700 truncate">
                      {event.promotor?.name || "Event Organizer"}
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
