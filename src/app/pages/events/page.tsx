"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEvent } from "@/utils/useEvent";
import { toast, Toaster } from "sonner";

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: "music" | "sport" | "food" | "beauty";
  price: string;
}

const categories: Event["category"][] = ["music", "sport", "food", "beauty"];
const EVENTS_PER_PAGE = 6;

const EventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const {getAllEvent, deleteEvent, generateCoupon } = useEvent();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function fetchEvents() {
      const result = await getAllEvent();
      setEvents(result);
      setFilteredEvents(result);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;
    if (selectedCategories.length > 0) {
      filtered = events.filter((event) =>
        selectedCategories.includes(event.category)
      );
    }
    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [selectedCategories, events]);

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-4">Browse Events</h1>

      {/* Filter */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1 rounded border ${
              selectedCategories.includes(category)
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
        <button
          onClick={handleReset}
          className="px-3 py-1 rounded border bg-red-200 text-red-700"
        >
          Reset
        </button>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paginatedEvents.map((event) => (
          <div
            key={event.id}
            className="border border-gray-300 rounded-lg p-4 shadow"
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.date}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <p className="font-bold">Rp{event.price.toLocaleString()}</p>
            <p className="text-sm italic">{event.category}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={async () => {
                  const res = await deleteEvent(Number(event.id));
                  if (res.success) {
                    toast.success("Event berhasil dihapus");
                    setEvents((prev) => prev.filter((e) => e.id !== event.id));
                  } else {
                    toast.error("Gagal menghapus event");
                  }
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={async () => {
                  const res = await generateCoupon(Number(event.id));
                  if (res.success) {
                    toast.success(`Kupon berhasil dibuat: ${res.data?.code}`);
                  } else {
                    toast.error("Gagal membuat kupon");
                  }
                }}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Generate Coupon
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
