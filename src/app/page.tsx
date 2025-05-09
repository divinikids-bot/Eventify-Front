"use client";

// import Navbar from './components/atomics/navbar.module';
import Footer from "./component/molecules/footer.module";
import HeroCarousel from "@/app/component/molecules/hero";
import EventPilihan from "./component/featured-event";
import CategoriesBadge from "@/app/component/molecules/badge-categories";
import PopularEvents from "./component/popular-events"; // jangan lupa import PopularEvents!
import Navbar from "./component/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Main Container */}
      <div className="min-h-screen pt-9 pb-20 bg-white pt-30 px-5 md:px-10 lg:px-20 xl:px-32">
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
