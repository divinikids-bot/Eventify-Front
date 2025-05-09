"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEvent } from "@/utils/useEvent";
import { EventCreatePayload } from "@/types/event.model";
import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/molecules/footer.module";


enum Category {
  MUSIC = "MUSIC",
  SPORTS = "SPORTS",
  FOOD = "FOOD",
  BEAUTY = "BEAUTY",
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventCreatePayload[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventCreatePayload[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 6;
  const router = useRouter();
  const { getAllEvent } = useEvent();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const result = await getAllEvent();
        console.log("Fetched events:", result); // Log the result to debug
        setEvents(result);
        setFilteredEvents(result);

        // Log unique locations for debugging
        const uniqueLocations = Array.from(new Set(result.map((e) => e.locationEvents)));
        console.log("Unique Locations:", uniqueLocations); // Ensure all locations are fetched
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  // Combine the enum categories with the event categories, but avoid duplicates
  const eventCategories = events.length > 0
    ? Array.from(new Set(events.map((e) => e.categoryEvents)))
    : [];

  console.log("Available event categories:", eventCategories); // Log available categories for debugging

  const categories = [
    Category.MUSIC,
    Category.SPORTS,
    Category.FOOD,
    Category.BEAUTY,
    ...eventCategories.filter((cat) => !Object.values(Category).includes(cat as Category)),
  ];

  console.log("Categories for filter:", categories); // Log selected categories

  // Get unique locations, ensuring the list has all locations
  const uniqueLocations =
    events.length > 0
      ? Array.from(new Set(events.map((e) => e.locationEvents))).sort()
      : [];

  console.log("Unique Locations for filter:", uniqueLocations); // Log locations for debugging

  const applyFilters = () => {
    let filtered = [...events];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((event) =>
        selectedCategories.includes(event.categoryEvents)
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter((event) => event.locationEvents === selectedLocation);
    }

    if (priceOrder === "asc") {
      filtered.sort((a, b) => Number(a.priceEvents) - Number(b.priceEvents));
    } else if (priceOrder === "desc") {
      filtered.sort((a, b) => Number(b.priceEvents) - Number(a.priceEvents));
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedLocation("");
    setPriceOrder("");
    setFilteredEvents(events);
    setCurrentPage(1);
  };

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-gray-100 text-black">
      <Navbar />
      <main className="flex flex-grow px-6 py-10 gap-8 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-[#172B4D] text-white rounded-lg p-5 space-y-6 h-fit">
          <h2 className="text-xl font-bold">Filters</h2>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map((cat) => (
              <div key={cat} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(cat)
                        ? prev.filter((c) => c !== cat)
                        : [...prev, cat]
                    );
                  }}
                  className="mr-2"
                />
                <label htmlFor={cat}>{cat}</label>
              </div>
            ))}
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <select
              className="bg-white w-full p-2 text-black rounded"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <select
              className="bg-white w-full p-2 text-black rounded"
              value={priceOrder}
              onChange={(e) => setPriceOrder(e.target.value)}
            >
              <option value="">Default</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>

          <div className="space-y-2">
            <button
              onClick={applyFilters}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full py-2 rounded"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="border border-white text-white w-full py-2 rounded hover:bg-white hover:text-black"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Event List */}
        <section className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
          <p className="mb-6 text-gray-600">Find and join exciting events happening around you</p>

          {filteredEvents.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEvents.map((event) => (
                <div
                  key={event.eventId}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-32 bg-gray-200 mb-3 rounded" />
                    <p className="text-sm text-gray-500">
                      {event.startDateEvents} | {event.locationEvents}
                    </p>
                    <span className="inline-block bg-yellow-300 text-xs font-semibold text-black px-2 py-1 mt-2 rounded">
                      {event.categoryEvents}
                    </span>
                    <h3 className="mt-2 font-bold text-lg">{event.nameEvents}</h3>
                    <p className="text-sm text-gray-700 line-clamp-2">{event.descriptionEvents}</p>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <p className="font-bold text-md">Rp{Number(event.priceEvents).toLocaleString()}</p>
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-sm px-3 py-1 rounded font-semibold"
                      onClick={() => router.push(`/events/${event?.eventId}`)}
                    >
                      Get Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center gap-2 text-sm">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
