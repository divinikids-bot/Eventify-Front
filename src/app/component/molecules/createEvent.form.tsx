import React, { useState } from "react";
import { getAuthCookie } from "@/app/lib/cookies";
import { toast } from "sonner";
import { EventCreatePayload } from "@/types/event.model";

export default function CreateEventForm({
  onCancel,
  onCreated,
}: {
  onCancel: () => void;
  onCreated?: () => void;
}) {
  const [formData, setFormData] = useState<EventCreatePayload>({
    nameEvents: "",
    categoryEvents: "MUSIC",
    priceEvents: "",
    descriptionEvents: "",
    locationEvents: "JAKARTA",
    startDateEvents: "",
    endDateEvents: "",
    availableSeats: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const { token } = getAuthCookie();
    if (!token) {
      toast.error("Token tidak ditemukan. Silakan login ulang.");
      setLoading(false);
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, String(value));
    });

    if (imageFile) {
      form.append("image", imageFile);
    }

    if (couponCode && couponDiscount > 0) {
      form.append("couponds[0][code]", couponCode);
      form.append("couponds[0][discount]", String(couponDiscount));
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-events`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error("Gagal membuat event.");
        setLoading(false);
        return;
      }

      toast.success("Event berhasil dibuat!");
      onCancel();
      onCreated?.();
    } catch (err) {
      toast.error("Terjadi kesalahan.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-blue-400/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create Event
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

          {/* Optional coupon fields */}
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
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

// Simple reusable input components
function Input({ label, name, type = "text", ...rest }: any) {
  return (
    <div>
      <p>{label}</p>
      <input
        type={type}
        name={name}
        className="w-full p-2 border rounded"
        {...rest}
      />
    </div>
  );
}

function Textarea({ label, name, ...rest }: any) {
  return (
    <div>
      <p>{label}</p>
      <textarea
        name={name}
        className="w-full p-2 border rounded"
        rows={4}
        {...rest}
      />
    </div>
  );
}

function Select({ label, name, options, ...rest }: any) {
  return (
    <div>
      <p>{label}</p>
      <select name={name} className="w-full p-2 border rounded" {...rest}>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
