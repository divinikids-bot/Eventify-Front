'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

const events = [
  {
    id: 1,
    title: 'Grand Final Ambassadors of UPH',
    date: '26 Apr 2025',
    price: 'Rp200.000',
    organizer: 'Ambassadors of UPH Medan Campus',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Concert of the Year',
    date: '15 Mei 2025',
    price: 'Rp150.000',
    organizer: 'Eventify',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Tech Conference 2025',
    date: '10 Jun 2025',
    price: 'Rp300.000',
    organizer: 'Tech Innovators',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Art Exhibition 2025',
    date: '20 Jul 2025',
    price: 'Rp100.000',
    organizer: 'Art Lovers Community',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'Kungking kang 2025',
    date: '20 Jul 2025',
    price: 'Rp100.000',
    organizer: 'Art Lovers Community',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
];

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
        {events.map((event) => (
          <SwiperSlide key={event.id} className="h-auto">
            <div className="h-full px-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-300 hover:shadow-xl transition duration-300">
                {/* Gambar Event */}
                <div className="relative w-full h-[200px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Konten */}
                <div className="p-3 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg text-gray-600 font-semibold truncate">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                    <p className="text-base text-gray-600 font-bold mt-2">{event.price}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-2 border-t">
                    <Image
                      src={event.logo}
                      alt={event.organizer}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-700 truncate">{event.organizer}</span>
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
