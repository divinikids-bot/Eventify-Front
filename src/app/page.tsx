"use client";

import Navbar from "./component/molecules/navbar.module";
import Footer from "./component/molecules/footer";
import HeroCarousel from "@/app/component/molecules/hero";
import EventPilihan from "./pages/featured-event";
import CategoriesBadge from "@/app/component/molecules/badge-categories";
import PopularEvents from "./pages/popular-events"; // jangan lupa import PopularEvents!

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main Container */}
      <div className="min-h-screen pt-9 pb-20 bg-white">
        {" "}
        {/* tambahkan pb-20 di sini */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Carousel */}
          <HeroCarousel />

          {/* Event Pilihan */}
          <section className="mt-20">
            <EventPilihan />
          </section>

          {/* Categories Badge */}
          <section className="mt-20">
            <CategoriesBadge />
          </section>

          {/* Popular Events */}
          <section className="mt-20">
            <PopularEvents />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
