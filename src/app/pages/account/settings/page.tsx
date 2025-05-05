'use client';

import { useState } from 'react';

export default function AccountSettingsPage() {
  const [form, setForm] = useState({
    full_name: "Budi Santoso",
    phone: "081234567890",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Perubahan disimpan (dummy)");
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Pengaturan Akun</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">No. HP</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
