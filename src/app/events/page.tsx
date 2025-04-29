"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  status: "Active" | "Inactive";
}

export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Startup Meetup 2025",
      date: "2025-06-15",
      location: "Jakarta, Indonesia",
      status: "Active",
    },
    {
      id: 2,
      name: "Tech Conference 2025",
      date: "2025-08-10",
      location: "Bali, Indonesia",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Music Festival 2025",
      date: "2025-09-05",
      location: "Bandung, Indonesia",
      status: "Active",
    },
  ]);

  const deleteEvent = (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Event Dashboard</h1>
          <Link
            href="/dashboard/events/create"
            className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded hover:bg-primary/90"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{event.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                        event.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                    <Link href={`/dashboard/events/edit/${event.id}`} className="text-primary hover:underline">
                      <Edit className="inline w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-600 hover:underline"
                    >
                      <Trash className="inline w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-10">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
