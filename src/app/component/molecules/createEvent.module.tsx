import React, { useState } from "react";
import { getAuthCookie } from "@/app/lib/cookies";
import { toast } from "sonner";

export default function CreateEventForm({
  onCancel,
  onCreated,
}: {
  onCancel: () => void;
  onCreated?: () => void;
}) {
  const [formData, setFormData] = useState({
    nameEvents: "",
    categoryEvents: "MUSIC",
    priceEvents: "",
    descriptionEvents: "",
    locationEvents: "JAKARTA",
    startDateEvents: "",
    endDateEvents: "",
    availableSeats: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "availableSeats" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { userId } = getAuthCookie();
    if (!userId) {
      toast.error("Promotor tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          promotorId: Number(userId), // Tambahkan promotorId
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal mengirim data");
      }

      toast.success("Event berhasil dibuat!");
      onCancel();
      onCreated?.(); // panggil callback untuk refresh
    } catch (err) {
      toast.error("Gagal membuat event.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center text-gray-700 justify-center bg-blue-400/40">
      <div className="inset-0 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create Event
          </h2>

          <div>
            <p>Name Event</p>
            <input
              type="text"
              name="nameEvents"
              placeholder="Nama Event"
              value={formData.nameEvents}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <p>Event Category</p>
            <select
              name="categoryEvents"
              value={formData.categoryEvents}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="MUSIC">Music</option>
              <option value="SPORTS">Sports</option>
              <option value="FOOD">Food</option>
              <option value="BEAUTY">Beauty</option>
            </select>
          </div>

          <div>
            <p>Price Event</p>
            <input
              type="text"
              name="priceEvents"
              placeholder="Harga Tiket"
              value={formData.priceEvents}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <p>Event Description</p>
            <textarea
              name="descriptionEvents"
              placeholder="Deskripsi Event"
              value={formData.descriptionEvents}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          <div>
            <p>Event Location</p>
            <select
              name="locationEvents"
              value={formData.locationEvents}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="JAKARTA">Jakarta</option>
              <option value="BANDUNG">Bandung</option>
              <option value="SURABAYA">Surabaya</option>
              <option value="BALI">Bali</option>
            </select>
          </div>

          <div>
            <p>Start Event</p>
            <input
              type="date"
              name="startDateEvents"
              value={formData.startDateEvents}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <p>End Event</p>
            <input
              type="date"
              name="endDateEvents"
              value={formData.endDateEvents}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <p>Available Seats</p>
            <input
              type="number"
              name="availableSeats"
              placeholder="Jumlah Kursi Tersedia"
              value={formData.availableSeats}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
