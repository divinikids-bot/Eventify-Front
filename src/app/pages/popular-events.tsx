'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { dummyEvents, EventData } from '../data/dummy-events'; // Pastikan path ini benar

export default function PopularEvents() {
  // Hapus baris berikut jika Anda ingin menampilkan SEMUA event
  // const popularEvents = dummyEvents.slice(0, 5); // Ambil 5 event pertama

  return (
    <section>
      <h2 className="text-2xl text-gray-600 font-bold mb-6">Event Populer</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {/* Sekarang kita langsung map melalui dummyEvents */}
        {dummyEvents.map((event: EventData) => (
          <SwiperSlide key={event.namaEvent}>
            <div className="h-full px-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-300 hover:shadow-lg transition duration-300">
                <div className="relative w-full h-[200px]">
                  <Image
                    src="/placeholder.svg" // Anda bisa ganti dengan properti gambar jika ditambahkan ke dummyEvents
                    alt={event.namaEvent}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-3 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-base text-gray-600 font-semibold truncate">{event.namaEvent}</h3>
                    <p className="text-xs text-gray-500">{event.tanggalEvent}</p>
                    <p className="text-sm text-gray-600 font-bold mt-2">Rp{event.hargaEvent.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center mt-3 pt-2 border-t">
                    <Image
                      src="/placeholder.svg" // Anda bisa ganti dengan properti logo jika ditambahkan ke dummyEvents
                      alt={event.eventOrganizer}
                      width={26}
                      height={26}
                      className="rounded-full mr-2 object-cover"
                    />
                    <span className="text-xs text-gray-700 truncate">{event.eventOrganizer}</span>
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