"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";
import Link from "next/link";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  imageUrl: string;
}

interface ApiResponse {
  data: Event[];
  message: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await api.get<ApiResponse>(`/events/search?query=${query}`);
        setResults(response.data.data);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch search results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Search Results for: "{query}"
        </h1>

        {isLoading && (
          <div className="text-center text-gray-600">Loading results...</div>
        )}

        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {!isLoading && !error && results.length === 0 && (
          <div className="text-center text-gray-600">No events found</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  📍 {event.location}
                </p>
                <p className="text-gray-600 mb-2">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-lg font-bold text-blue-600">
                  ${event.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}