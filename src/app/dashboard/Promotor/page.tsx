"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/axios";
import { FaCalendarAlt, FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";
import { useEvent } from "@/utils/useEvent";
import { getAuthCookie } from "@/app/lib/cookies";
import { toast } from "sonner";
import { EventList } from "@/types/event.model";
import CreateEventForm from "@/app/component/molecules/createEvent.form";
import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/molecules/footer.module";

export default function PagePromotor() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [eventList, setEventList] = useState<EventList[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventList | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { getEventsByPromotor, deleteEvent } = useEvent();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    // const { token, role } = getAuthCookie();

    // if (!token || role !== "PROMOTOR") {
    //   toast.error("Gagal mengambil data promotor. Silakan login ulang.");
    //   return;
    // }

    try {
      const { token, role } = getAuthCookie();
      if (!token || role !== "PROMOTOR") {
        throw new Error("Unauthorized");
      }

      const response = await api.get("/promotor/events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setEventList(response.data.data);
      } else {
        throw new Error("Failed to fetch events");
      }
    } catch (err) {
      // setError(err.message);
      toast.error("Gagal memuat data event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId: number) => {
    const confirmed = confirm("Yakin ingin menghapus event ini?");
    if (!confirmed) return;

    setDeletingId(eventId); // mulai loading

    try {
      const response = await api.delete(`/delete-events`, {
        headers: {
          Authorization: `Bearer ${getAuthCookie().token}`,
        },
        data: { eventId },
      });

      if (response.status === 200) {
        toast.success("Event berhasil dihapus.");
        fetchEvents();
      } else {
        toast.error("Gagal menghapus event.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus event.");
      console.error(error);
    } finally {
      setDeletingId(null); // selesai loading
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events on component mount
  }, []);

  const StatCard = ({
    title,
    value,
    icon: Icon,
  }: {
    title: string;
    value: string | number;
    icon: any;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="text-blue-500 text-3xl" />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 text-gray-700 min-h-screen flex flex-col pt-20">
      <Navbar />
      <div className=" min-h-screen p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Promotor
          </h1>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setShowForm(true)}
          >
            + Create Event
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Event"
            value={eventList.length}
            icon={FaCalendarAlt}
          />
          <StatCard title="Tiket Terjual" value="" icon={FaTicketAlt} />
          <StatCard
            title="Total Pendapatan"
            value="Rp "
            icon={FaMoneyBillWave}
          />
        </div>

        {showForm && (
          <CreateEventForm
            initialData={editingEvent}
            onCancel={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
            onCreated={() => {
              fetchEvents();
              setShowForm(false);
              setEditingEvent(null);
            }}
          />
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            {loading && (
              <span className="text-sm text-gray-500">Loading...</span>
            )}
          </div>

          {error ? (
            <div className="text-red-500 p-4">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tiket Terjual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventList?.map((event) => (
                    <tr key={event.eventId} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{event.nameEvents}</td>
                      <td className="px-6 py-4">
                        {new Date(event.startDateEvents).toLocaleDateString()} -{" "}
                        {new Date(event.endDateEvents).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{event.ticketsSold || 0}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {event.status || "Aktif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          onClick={() => {
                            setEditingEvent(event); // kirim data event ke form
                            setShowForm(true);
                          }}
                        >
                          Ubah
                        </button>
                        <button
                          className={`text-red-600 hover:text-red-900 ${
                            deletingId === event.eventId
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleDelete(event.eventId)}
                          disabled={deletingId === event.eventId}
                        >
                          {deletingId === event.eventId
                            ? "Menghapus..."
                            : "Hapus"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
