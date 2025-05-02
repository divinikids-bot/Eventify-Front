import React, { useState } from "react";

export default function CreateEvent() {
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
    // Call API or pass formData to parent handler
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buat Event</h1>
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
