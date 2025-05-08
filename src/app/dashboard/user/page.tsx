"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("tickets");
  const router = useRouter();

  const user = {
    firstName: session?.user?.firstName || "",
    lastName: session?.user?.lastName || "",
    email: session?.user?.email || "",
    phone: session?.user?.phone || "",
    birthDate: session?.user?.birthDate || "",
    gender: session?.user?.gender || "",
    avatar: session?.user?.image || "/profileblank.svg",
  };

  const renderContent = () => {
    switch (activeTab) {
      case "tickets":
        return <TicketsSection />;
      case "info":
        return <BasicInfo user={user} />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar Menu */}
      <aside className="w-72 bg-white p-6 border-r border-gray-200 hidden md:block shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img
              src={user.avatar} 
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-6 text-gray-700">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className={tabStyle(activeTab === "home")}
          >
            <i className="fas fa-home mr-3"></i>
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("tickets")}
            className={tabStyle(activeTab === "tickets")}
          >
            <i className="fas fa-ticket-alt mr-3"></i>
            Tiket Saya
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("info")}
            className={tabStyle(activeTab === "info")}
          >
            <i className="fas fa-user-circle mr-3"></i>
            Informasi Dasar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("settings")}
            className={tabStyle(activeTab === "settings")}
          >
            <i className="fas fa-cog mr-3"></i>
            Pengaturan
          </motion.button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function tabStyle(active: boolean) {
  return `flex items-center text-left px-4 py-3 rounded-lg font-medium transition-all ${
    active
      ? "bg-blue-600 text-white shadow-md"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }`;
}

function TicketsSection() {
  const [ticketTab, setTicketTab] = useState<"active" | "past">("active");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-gray-800">Tiket Saya</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setTicketTab("active")}
            className={subTabStyle(ticketTab === "active")}
          >
            <i className="fas fa-bolt mr-2"></i>
            Event Aktif
          </button>
          <button
            onClick={() => setTicketTab("past")}
            className={subTabStyle(ticketTab === "past")}
          >
            <i className="fas fa-history mr-2"></i>
            Event Lalu
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-ticket-alt text-3xl text-gray-400"></i>
          </div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">
            {ticketTab === "active"
              ? "Belum ada tiket aktif"
              : "Belum ada riwayat tiket"}
          </h4>
          <p className="text-gray-500 mb-6">
            {ticketTab === "active"
              ? "Tiket untuk event yang akan datang akan muncul di sini"
              : "Tiket dari event yang sudah berlalu akan muncul di sini"}
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md"
          >
            Cari Event Menarik
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function BasicInfo({ user }: { user: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    birthDate: user.birthDate,
    gender: user.gender
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically call an API to update user data
      // await updateUserProfile(formData);
      setIsEditing(false);
      // Optionally show success message
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Optionally show error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-bold text-gray-800">Informasi Dasar</h3>
        {isEditing ? (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium"
            >
              Batal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md"
            >
              Simpan Perubahan
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md"
          >
            Edit Profil
          </motion.button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">
                Nama Depan
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
                }`}
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">
                Nama Belakang
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
                }`}
                disabled={!isEditing}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg"
                disabled
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                No. Ponsel
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
                }`}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-gray-700 text-sm font-medium mb-2">
                Tanggal Lahir
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
                }`}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200"
                }`}
                disabled={!isEditing}
              >
                <option value="">Pilih Gender</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Pengaturan</h3>
      <div className="bg-white rounded-xl shadow-md p-8">
        <p className="text-gray-500">Belum ada pengaturan tambahan.</p>
      </div>
    </div>
  );
}

function subTabStyle(active: boolean) {
  return `px-4 py-2 rounded-lg font-medium transition ${
    active 
      ? "bg-blue-600 text-white" 
      : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
  }`;
}