import React, { useState } from "react";

export default function CreateEventForm({
  onCancel,
}: {
  onCancel: () => void;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Kirim data ke backend di sini
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nameEvents"
        placeholder="Nama Event"
        value={formData.nameEvents}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
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
      <input
        type="text"
        name="priceEvents"
        placeholder="Harga Tiket"
        value={formData.priceEvents}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="descriptionEvents"
        placeholder="Deskripsi Event"
        value={formData.descriptionEvents}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows={4}
      />
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
      <input
        type="date"
        name="startDateEvents"
        value={formData.startDateEvents}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="endDateEvents"
        value={formData.endDateEvents}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="availableSeats"
        placeholder="Jumlah Kursi Tersedia"
        value={formData.availableSeats}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex gap-4">
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
  );
}
