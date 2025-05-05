'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules'; // 👉 tambahkan Autoplay
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/carousel-1.jpg',
    alt: 'Pesta Diskon Wahana',
  },
  {
    id: 2,
    image: '/images/carousel-2.jpg',
    alt: 'Promo Lainnya',
  },
  {
    id: 3,
    image: '/images/carousel-3.jpg',
    alt: 'Event Terbaru',
  },
  {
    id: 4,
    image: '/images/carousel-4.jpg',
    alt: 'Event Populer',
  }
];

export default function HeroCarousel() {
  return (
    <div className="w-full max-w-screen-xl mx-auto rounded-xl overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay]} // 👉 aktifkan module Autoplay
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 3000, // 👉 delay antar slide dalam ms (3000ms = 3 detik)
          disableOnInteraction: false, // setelah user swipe manual, tetap lanjut autoplay
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              src={slide.image}
              alt={slide.alt}
              width={1200}
              height={400}
              className="w-full object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
