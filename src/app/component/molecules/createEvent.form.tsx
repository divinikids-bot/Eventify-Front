"use client";

import React, { useState } from "react";
import { getAuthCookie } from "@/app/lib/cookies";
import { toast } from "sonner";
import { EventCreatePayload } from "@/types/event.model";
import { api } from "@/app/lib/axios";
import { useRouter } from "next/navigation";

// === Props Interface ===
export interface CreateEventFormProps {
  onCancel: () => void;
  onCreated?: () => void;
  initialData?: any | null; // Replace 'any' with the correct type if known
  eventData?: EventCreatePayload & { id: string }; // tambahkan id untuk update
}

// === Main Component ===
export default function CreateEventForm({
  onCancel,
  onCreated,
  eventData,
}: CreateEventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EventCreatePayload>(
    eventData || {
      nameEvents: "",
      categoryEvents: "MUSIC",
      priceEvents: "",
      descriptionEvents: "",
      locationEvents: "JAKARTA",
      startDateEvents: "",
      endDateEvents: "",
      availableSeats: 0,
    }
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // === Input Handler ===
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

  // === Submit Handler ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.nameEvents ||
      !formData.priceEvents ||
      !formData.descriptionEvents ||
      !formData.startDateEvents ||
      !formData.endDateEvents ||
      formData.availableSeats <= 0
    ) {
      toast.error("Semua field wajib diisi dan kursi harus lebih dari 0");
      setLoading(false);
      return;
    }

    const start = new Date(formData.startDateEvents);
    const end = new Date(formData.endDateEvents);

    if (end < start) {
      toast.error("Tanggal selesai tidak boleh lebih awal dari tanggal mulai.");
      setLoading(false);
      return;
    }

    const { token } = getAuthCookie();
    if (!token) {
      toast.error("Token tidak ditemukan. Silakan login ulang.");
      setLoading(false);
      return;
    }

    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "startDateEvents" || key === "endDateEvents") {
        const isoDate = new Date(value).toISOString();
        form.append(key, isoDate);
      } else {
        form.append(key, String(value));
      }
    });

    if (imageFile) form.append("image", imageFile);

    if (couponCode && couponDiscount > 0) {
      form.append("couponds[0][code]", couponCode);
      form.append("couponds[0][discount]", String(couponDiscount));
    }

    try {
      let res;
      if (eventData) {
        // EDIT
        res = await api.put(`/events/${eventData.id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // CREATE
        res = await api.post("/create-events", form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (!res.data.success) {
        toast.error("Gagal memproses event.");
        setLoading(false);
        return;
      }

      toast.success(
        eventData ? "Event berhasil diperbarui!" : "Event berhasil dibuat!"
      );
      setLoading(false);
      onCancel();
      if (onCreated) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        onCreated();
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat memproses event.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            {eventData ? "Edit Event" : "Create Event"}
          </h2>

          <Input
            label="Name Event"
            name="nameEvents"
            value={formData.nameEvents}
            onChange={handleChange}
          />
          <Select
            label="Event Category"
            name="categoryEvents"
            value={formData.categoryEvents}
            onChange={handleChange}
            options={["MUSIC", "SPORTS", "FOOD", "BEAUTY"]}
          />
          <Input
            label="Price Event"
            name="priceEvents"
            value={formData.priceEvents}
            onChange={handleChange}
          />
          <Textarea
            label="Event Description"
            name="descriptionEvents"
            value={formData.descriptionEvents}
            onChange={handleChange}
          />
          <Select
            label="Event Location"
            name="locationEvents"
            value={formData.locationEvents}
            onChange={handleChange}
            options={["JAKARTA", "BANDUNG", "SURABAYA", "BALI"]}
          />
          <Input
            label="Start Event"
            name="startDateEvents"
            type="date"
            value={formData.startDateEvents}
            onChange={handleChange}
          />
          <Input
            label="End Event"
            name="endDateEvents"
            type="date"
            value={formData.endDateEvents}
            onChange={handleChange}
          />
          <Input
            label="Available Seats"
            name="availableSeats"
            type="number"
            value={formData.availableSeats}
            onChange={handleChange}
          />
          <Input
            label="Event Image"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setImageFile(e.target.files[0])
            }
          />
          <Input
            label="Coupon Code (opsional)"
            value={couponCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCouponCode(e.target.value)
            }
          />
          <Input
            label="Coupon Discount (%) (opsional)"
            type="number"
            value={couponDiscount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCouponDiscount(Number(e.target.value))
            }
          />
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// === Reusable Input Components ===
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
}
function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <p className="mb-1 font-medium">{label}</p>
      <input className="w-full p-2 border rounded" {...props} />
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}
function Textarea({ label, ...props }: TextareaProps) {
  return (
    <div>
      <p className="mb-1 font-medium">{label}</p>
      <textarea className="w-full p-2 border rounded" rows={4} {...props} />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  name: string;
}
function Select({ label, options, ...props }: SelectProps) {
  return (
    <div>
      <p className="mb-1 font-medium">{label}</p>
      <select className="w-full p-2 border rounded" {...props}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}