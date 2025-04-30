import { api } from "@/app/lib/axios"; // Pastikan API client sudah disetting
import { useState } from "react";

export function useEvents() {
  // State untuk menyimpan event data dan status
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch events
  async function fetchEvents() {
    setLoading(true);
    try {
      const response = await api.get("/events");
      console.log("Fetched events: ", response.data);
      setEvents(response.data); // Simpan hasil events ke state
      setError(null);
    } catch (err: any) {
      console.error("Error fetching events:", err);
      setError("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  }

  // Add a new event
  async function addEvent(eventData: { title: string; date: string; description: string; category: string }) {
    setLoading(true);
    try {
      const response = await api.post("/events", eventData);
      console.log("Added new event: ", response.data);
      // Optionally re-fetch events after adding new event
      fetchEvents();
      return {
        message: "Event added successfully",
        success: true,
      };
    } catch (err: any) {
      console.error("Error adding event:", err);
      return {
        message: "Failed to add event",
        success: false,
      };
    } finally {
      setLoading(false);
    }
  }

  // Delete an event
  async function deleteEvent(eventId: string) {
    setLoading(true);
    try {
      const response = await api.delete(`/events/${eventId}`);
      console.log("Deleted event: ", response.data);
      // Optionally re-fetch events after deleting
      fetchEvents();
      return {
        message: "Event deleted successfully",
        success: true,
      };
    } catch (err: any) {
      console.error("Error deleting event:", err);
      return {
        message: "Failed to delete event",
        success: false,
      };
    } finally {
      setLoading(false);
    }
  }

  return {
    events,
    error,
    loading,
    fetchEvents,
    addEvent,
    deleteEvent,
  };
}
