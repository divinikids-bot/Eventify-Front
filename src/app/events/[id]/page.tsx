"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/molecules/footer.module";
import { api } from "@/app/lib/axios";

export interface Event {
  eventId: number;
  promotorId: number;
  nameEvents: string;
  categoryEvents: string;
  imgUrl?: string;
  priceEvents: string;
  descriptionEvents: string;
  locationEvents: string;
  startDateEvents: string; // Changed from Date to string since API returns string
  endDateEvents: string;   // Changed from Date to string since API returns string
  availableSeats: number;  // Fixed typo from AvaibleSeats to availableSeats
}

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = useParams(); // Ambil id dari router.query

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventId = parseInt(id as string); // Casting id yang didapat dari query menjadi string
  const isValidId = !isNaN(eventId) && eventId > 0;
  console.log("====Event ID====", eventId);

  useEffect(() => {
    if (!isValidId) {
      setError("Invalid event ID");
      setLoading(false);
      return;
    }

    const fetchEventData = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        console.log("====Check Data====", res.data);
        if (!res.data) {
          throw new Error("Event not found");
        }
        setEvent(res.data);
      } catch (err: any) {
        const isHtmlError = typeof err.response?.data === "string" && err.response?.data.startsWith("<!DOCTYPE html");
        const errorMessage = isHtmlError
          ? "Halaman tidak ditemukan (404)"
          : err.response?.data?.message || err.message || "Gagal mengambil data event";
  
        setError(errorMessage);
        console.error("Detail error Axios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId, isValidId]);

  if (!isValidId) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto p-4">
          <div className="text-red-700 bg-red-100 p-4 rounded">
            <p>Invalid event ID in URL: {id}</p>
            <button
              className="mt-3 text-blue-600 hover:underline"
              onClick={() => router.push("/events")}
            >
              Back to Events Broo
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto p-4 flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
            <span>Loading event #{eventId}...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto p-4">
          <div className="text-red-700 bg-red-100 p-4 rounded">
            <p>Error: {error}</p>
            <button
              className="mt-3 text-blue-600 hover:underline"
              onClick={() => router.push("/events")}
            >
              Back to Events Cuyyy
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto p-4">
          <div className="text-red-700 bg-red-100 p-4 rounded">
            <p>Event not found</p>
            <button
              className="mt-3 text-blue-600 hover:underline"
              onClick={() => router.push("/events")}
            >
              Back to Events Coooo
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse the date strings from the API
  const startDate = new Date(event.startDateEvents);
  const endDate = new Date(event.endDateEvents);

  const formattedStartDate = startDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedStartTime = startDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndDate = endDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedEndTime = endDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <div className="container mx-auto py-6 px-4">
        {event.imgUrl && (
          <img
            src={event.imgUrl}
            alt={event.nameEvents}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{event.nameEvents}</h1>
        <p className="text-gray-500 mb-1">Event ID: {eventId}</p>
        <p className="text-gray-600 mb-1">📍 {event.locationEvents}</p>
        <p className="text-gray-600 mb-1">
          📅 {formattedStartDate} - 🕒 {formattedStartTime}
        </p>
        {startDate.toDateString() !== endDate.toDateString() && (
          <p className="text-gray-600 mb-1">
            Sampai: 📅 {formattedEndDate} - 🕒 {formattedEndTime}
          </p>
        )}
        <p className="text-lg font-semibold text-yellow-600 mb-3">
          Rp{Number(event.priceEvents).toLocaleString("id-ID")}
        </p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Deskripsi Event</h2>
          <p className="whitespace-pre-line">{event.descriptionEvents}</p>
        </div>

        <div className="border-t pt-4 mt-6">
          <h2 className="text-xl font-semibold mb-2">Kategori: {event.categoryEvents}</h2>
          <p className="text-gray-600">Tersedia: {event.availableSeats} kursi</p>
          <p className="text-gray-600">Organizer: {event.promotorId}</p>
        </div>

        <div className="mt-6">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold transition-colors"
            onClick={() => router.push(`/events/${eventId}/tickets`)}
            disabled={event.availableSeats <= 0}
          >
            {event.availableSeats <= 0 ? "Sold Out" : "Get Ticket"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}