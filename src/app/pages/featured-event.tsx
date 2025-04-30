'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { dummyEvents, EventData } from '../data/dummy-events'; // Sesuaikan path jika perlu

export default function EventPilihan() {
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
        {dummyEvents.map((event: EventData) => (
          <SwiperSlide key={event.namaEvent} className="h-auto">
            <div className="h-full px-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-300 hover:shadow-xl transition duration-300">
                {/* Gambar Event */}
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/placeholder.svg" // Anda mungkin ingin mengganti ini dengan properti gambar dari dummyEvents jika ada
                    alt={event.namaEvent}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Konten */}
                <div className="p-3 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg text-gray-600 font-semibold truncate">{event.namaEvent}</h3>
                    <p className="text-sm text-gray-500">{event.tanggalEvent}</p>
                    <p className="text-base text-gray-600 font-bold mt-2">Rp{event.hargaEvent.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-2 border-t">
                    <Image
                      src="/placeholder.svg" // Anda mungkin ingin mengganti ini dengan properti logo jika ada di dummyEvents
                      alt={event.eventOrganizer}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700 truncate">{event.eventOrganizer}</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}