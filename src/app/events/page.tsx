"use client";

import { useEffect, useState } from "react";
import { dummyEvents as importedDummyEvents, EventData } from "../data/dummy-events"; // Impor data dummy

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: "music" | "sport" | "performing visual & arts" | "dating" | "business";
  price: string;
}; // Sesuaikan tipe Event

const categories = [
  "music",
  "sport",
  "performing visual & arts",
  "dating",
  "business",
];

const EVENTS_PER_PAGE = 6;

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Map importedDummyEvents ke dalam format Event yang sesuai dengan komponen ini
    const formattedEvents: Event[] = importedDummyEvents.map(event => ({
      id: event.namaEvent.toLowerCase().replace(/\s+/g, '-'), // Generate ID sederhana
      title: event.namaEvent,
      date: event.tanggalEvent,
      location: event.lokasiEvent,
      description: event.deskripsiEvent,
      category: event.kategori, // Gunakan properti kategori dari dummyEvents
      price: `Rp${event.hargaEvent.toLocaleString()}`,
      // Anda bisa menambahkan properti 'image' jika ada di dummyEvents
    }));
    setEvents(formattedEvents);
    setFilteredEvents(formattedEvents);
  }, []);

  useEffect(() => {
    let filtered = events;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(event => selectedCategories.includes(event.category));
    }
    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [selectedCategories, events]);

  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-7xl mx-auto">
        {/* Sidebar with navy blue background */}
        <aside className="w-full md:w-1/4 bg-[#172B4D] rounded-lg shadow-lg p-6 mb-8 md:mb-0 text-white">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Categories</label>
            {categories.map(category => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2 accent-yellow-400"
                />
                <label htmlFor={category} className="text-sm capitalize">{category.replace(/_/g, ' ')}</label> {/* Menampilkan kategori dengan format yang lebih baik */}
              </div>
            ))}
          </div>
          <button
            className="w-full bg-yellow-400 text-[#172B4D] font-semibold py-2 rounded mb-2 hover:bg-yellow-300 transition-colors"
          >
            Apply Filters
          </button>
          <button
            className="w-full border border-gray-300 text-white py-2 rounded hover:bg-white hover:text-[#172B4D] transition-colors"
            onClick={handleReset}
          >
            Reset Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Discover Events</h1>
          <p className="mb-6 text-gray-600">Find and join exciting events happening around you</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-xl p-4 flex flex-col transition-transform hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="bg-gray-100 rounded h-32 flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-4xl">🖼️</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span className="mr-2">📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="mx-2">•</span>
                  <span>📍 {event.location}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mr-2 capitalize">{event.category.replace(/_/g, ' ')}</span> {/* Menampilkan kategori dengan format yang lebih baik */}
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-800">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{event.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-base text-gray-800">{event.price}</span>
                  <button className="bg-yellow-400 text-[#172B4D] font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition-colors">
                    Get Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
              >
                Prev
              </button>
              <span className="px-4 py-2 text-gray-700">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EventsPage;