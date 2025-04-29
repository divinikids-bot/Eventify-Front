'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

const popularEvents = [
  {
    id: 1,
    title: 'Festival Musik Indonesia',
    date: '30 Apr 2025',
    price: 'Rp250.000',
    organizer: 'IndoMusic Festival',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Jakarta Tech Expo',
    date: '12 Mei 2025',
    price: 'Rp100.000',
    organizer: 'TechWorld ID',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Creative Art Fest',
    date: '22 Jun 2025',
    price: 'Rp75.000',
    organizer: 'Art Hub',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Startup Pitch Day',
    date: '05 Jul 2025',
    price: 'Gratis',
    organizer: 'Startup Community',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'Summer EDM Party',
    date: '17 Ags 2025',
    price: 'Rp400.000',
    organizer: 'EDM Nation',
    image: '/placeholder.svg',
    logo: '/placeholder.svg',
  },
];

export default function PopularEvents() {
  return (
    <section>
      <h2 className="text-2xl text-gray-600 font-bold mb-6">Event Populer</h2>
      <Swiper
        spaceBetween={16} // sedikit lebih rapat
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {popularEvents.map((event) => (
          <SwiperSlide key={event.id}>
            <div className="h-full px-2"></div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 hover:shadow-lg transition duration-300">
              <div className="relative w-full h-[200px]"> {/* Dulu 200px, sekarang 160px */}
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3 flex flex-col justify-between flex-grow"> {/* padding dikecilin */}
                <div>
                  <h3 className="text-base text-gray-600 font-semibold truncate">{event.title}</h3> {/* text-lg -> text-base */}
                  <p className="text-xs text-gray-500">{event.date}</p> {/* text-sm -> text-xs */}
                  <p className="text-sm text-gray-600 font-bold mt-2">{event.price}</p> {/* text-base -> text-sm */}
                </div>

                <div className="flex items-center mt-3 pt-2 border-t">
                  <Image
                    src={event.logo}
                    alt={event.organizer}
                    width={26}
                  height={26}
                    className="rounded-full mr-2 object-cover"
                  />
                  <span className="text-xs text-gray-700 truncate">{event.organizer}</span> {/* text-sm -> text-xs */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
