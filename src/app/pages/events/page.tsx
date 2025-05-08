"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEvent } from "@/utils/useEvent";
import { toast, Toaster } from "sonner";
import { EventCreatePayload } from "@/types/event.model";
import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/molecules/footer.module";

const categories = ["MUSIC", "SPORTS", "FOOD", "BEAUTY"];
const EVENTS_PER_PAGE = 6;

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventCreatePayload[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventCreatePayload[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceOrder, setPriceOrder] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getAllEvent, deleteEvent, generateCoupon } = useEvent();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const result = await getAllEvent();
      setEvents(result);
      setFilteredEvents(result);
      setIsLoading(false);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (selectedCategory) {
      filtered = filtered.filter(
        (event) => event.categoryEvents === selectedCategory
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (event) => event.locationEvents === selectedLocation
      );
    }

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.nameEvents.toLowerCase().includes(lowerSearch) ||
          event.descriptionEvents.toLowerCase().includes(lowerSearch)
      );
    }

    if (priceOrder === "asc") {
      filtered.sort((a, b) => Number(a.priceEvents) - Number(b.priceEvents));
    } else if (priceOrder === "desc") {
      filtered.sort((a, b) => Number(b.priceEvents) - Number(a.priceEvents));
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [selectedCategory, selectedLocation, searchTerm, priceOrder, events]);

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, totalPages || 1);

  const paginatedEvents = filteredEvents.slice(
    (validCurrentPage - 1) * EVENTS_PER_PAGE,
    validCurrentPage * EVENTS_PER_PAGE
  );

  const uniqueLocations = Array.from(
    new Set(events.map((e) => e.locationEvents))
  ).sort();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black pb-40">
      <Navbar />
      <div className="flex-grow max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Browse Events</h1>

        {/* Filter Bar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or description..."
            className="w-full px-4 py-2 bg-gray-100 text-gray-500 placeholder-gray-400 border border-gray-600 rounded-md shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-blue-900 text-white border border-gray-600 rounded-md shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-2 bg-blue-900 text-white border border-gray-600 rounded-md shadow-sm"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <select
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value)}
            className="w-full px-4 py-2 bg-blue-900 text-white border border-gray-600 rounded-md shadow-sm"
          >
            <option value="">Default Price</option>
            <option value="asc">Termurah</option>
            <option value="desc">Termahal</option>
          </select>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-lg font-semibold text-black">
            Loading events...
          </div>
        )}

        {/* No Result */}
        {!isLoading && paginatedEvents.length === 0 && (
          <div className="text-center text-gray-700 mt-10">
            No events found.
          </div>
        )}

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading &&
            paginatedEvents.map((event) => (
              <div
                key={event.eventId}
                className="bg-white text-black rounded-xl shadow-md p-5 border border-gray-200 flex flex-col justify-between h-[380px]"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {event.nameEvents}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {event.startDateEvents}
                  </p>
                  <p className="mt-1">{event.locationEvents}</p>
                  <div className="mt-2 text-sm text-gray-800 max-h-20 overflow-hidden">
                    {event.descriptionEvents}
                  </div>
                  <p className="font-bold mt-2 text-green-700 text-lg">
                    Rp{event.priceEvents.toLocaleString()}
                  </p>
                  <p className="text-xs italic text-gray-500">
                    {event.categoryEvents}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={async () => {
                      const res = await deleteEvent(Number(event.eventId));
                      if (res.success) {
                        toast.success("Event berhasil dihapus");
                        setEvents((prev) =>
                          prev.filter((e) => e.eventId !== event.eventId)
                        );
                      } else {
                        toast.error("Gagal menghapus event");
                      }
                    }}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={async () => {
                      const res = await generateCoupon(Number(event.eventId));
                      if (res.success) {
                        toast.success(
                          `Kupon berhasil dibuat: ${res.data?.code}`
                        );
                      } else {
                        toast.error("Gagal membuat kupon");
                      }
                    }}
                    className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Generate Coupon
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  validCurrentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
