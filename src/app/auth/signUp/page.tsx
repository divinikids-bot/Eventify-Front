"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useAuth } from "@/utils/useAuth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    referralCode: "",
    referredBy: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Router untuk redirect

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [hasReferral, setHasReferral] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    if (!signUp) {
      toast.error("Sign Up function is not available.");
      setIsSubmitting(false);
      return;
    }

    console.log("Form Data :", formData);
    try {
      // Kirim data ke API untuk sign up
      const result = await signUp({
        name: String(formData.name),
        email: String(formData.email),
        password: String(formData.password),
        role: String(formData.role) === "USER" ? "USER" : "PROMOTOR",
        referralCode: String(formData.referralCode) || "",
        referredBy: String(formData.referredBy) || "",
      });

      console.log("cek result : ", result);

      if (result.success) {
        toast.success(result.message as string); // Notifikasi sukses
        router.push("/pages/dashboard/user"); // Redirect ke dashboard setelah berhasil
      } else {
        const errorMessage =
          typeof result.message === "string"
            ? result.message
            : JSON.stringify(result.message);
        toast.error(errorMessage);
      }
    } catch (error: unknown) {
      console.error("Sign Up Error: ", error);

      // Memastikan error memiliki tipe yang benar sebelum menggunakan message-nya
      if (error instanceof Error) {
        toast.error(error.message); // Menampilkan pesan error dari instance Error
      } else {
        toast.error("Registration failed"); // Jika error bukan instance Error
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Toaster richColors position="top-center" />
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Kiri: Ilustrasi + Teks */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <Image
            src="/images/mascot.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h2 className="text-xl text-center text-gray-900 font-semibold">
            Tidak lagi ketinggalan event dan konser favoritmu
          </h2>
          <p className="text-xl text-center text-gray-900 font-semibold max-w-md">
            Gabung dan rasakan kemudahan bertransaksi dan mengelola event di
            Eventify.
          </p>
        </div>

        {/* Kanan: Form Login */}
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-auto border">
          <h3 className="text-xl text-gray-900 font-semibold mb-2">Sign-Up!</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm text-gray-600 font-medium mb-1"
                htmlFor="name"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border rounded px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama anda"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm text-gray-600 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border rounded px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                className="block text-sm text-gray-600 font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full border rounded px-4 py-2 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-9 right-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Role */}
            <div>
              <label
                className="block text-sm text-gray-600 font-medium mb-1"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full border rounded px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.role.toUpperCase()}
                onChange={handleChange}
                required
              >
                <option value="USER">User</option>
                <option value="PROMOTOR">Promotor</option>
              </select>
            </div>

            {/* Referredby code */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasReferral"
                checked={hasReferral}
                onChange={() => setHasReferral(!hasReferral)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasReferral" className="text-sm text-gray-600">
                Saya punya kode referral
              </label>
            </div>

            {hasReferral && (
              <div>
                <label
                  className="block text-sm text-gray-600 font-medium mb-1"
                  htmlFor="referredBy"
                >
                  Masukkan kode referral
                </label>
                <input
                  type="text"
                  id="referredBy"
                  name="referredBy"
                  className="w-full border rounded px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.referredBy}
                  onChange={handleChange}
                  placeholder="Contoh: MILS123"
                />
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mendaftar..." : "Daftar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
