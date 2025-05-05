"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function pageUser() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("tickets");

  const user = {
    firstName: session?.user?.firstName || "",
    lastName: session?.user?.lastName || "",
    email: session?.user?.email || "",
    phone: session?.user?.phone || "",
    birthDate: session?.user?.birthDate || "",
    gender: session?.user?.gender || "",
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Menu */}
      <aside className="w-64 bg-white p-6 border-r hidden md:block">
        <h2 className="text-xl font-bold mb-6 text-gray-600">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab("tickets")}
            className={tabStyle(activeTab === "tickets")}
          >
            Tiket Saya
          </button>
          <button
            onClick={() => setActiveTab("info")}
            className={tabStyle(activeTab === "info")}
          >
            Informasi Dasar
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={tabStyle(activeTab === "settings")}
          >
            Pengaturan
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}

function tabStyle(active: boolean) {
  return `text-left px-4 py-2 rounded-md font-medium ${
    active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
  }`;
}

function subTabStyle(active: boolean) {
  return `px-4 py-2 rounded-full text-sm ${
    active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
  }`;
}

// --- Tiket Section ---
function TicketsSection() {
  const [ticketTab, setTicketTab] = useState<"active" | "past">("active");

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-gray-600">Tiket Saya</h3>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTicketTab("active")}
          className={subTabStyle(ticketTab === "active")}
        >
          Event Aktif
        </button>
        <button
          onClick={() => setTicketTab("past")}
          className={subTabStyle(ticketTab === "past")}
        >
          Event Lalu
        </button>
      </div>

      <div className="text-gray-500">
        {ticketTab === "active" ? (
          <p>Belum ada tiket untuk event aktif.</p>
        ) : (
          <p>Belum ada tiket dari event yang lalu.</p>
        )}
      </div>
    </div>
  );
}

// --- Informasi Dasar Section ---
function BasicInfo({ user }: { user: any }) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-4 text-gray-600">Informasi Dasar</h3>
      <div className="bg-white p-6 rounded-md shadow-md space-y-4 text-gray-600">
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Nama Depan
          </label>
          <input type="text" defaultValue={user.firstName} className="input" />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Nama Belakang
          </label>
          <input type="text" defaultValue={user.lastName} className="input" />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            defaultValue={user.email}
            className="input"
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            No. Ponsel
          </label>
          <input type="text" defaultValue={user.phone} className="input" />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Tanggal Lahir
          </label>
          <input type="date" defaultValue={user.birthDate} className="input" />
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-medium">
            Jenis Kelamin
          </label>
          <div className="flex gap-4 mt-2">
            <label>
              <input
                type="radio"
                name="gender"
                defaultChecked={user.gender === "Laki-laki"}
              />{" "}
              Laki-laki
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                defaultChecked={user.gender === "Perempuan"}
              />{" "}
              Perempuan
            </label>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}

// --- Pengaturan Section ---
function Settings() {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-gray-600">Pengaturan</h3>
      <p className="text-gray-700">
        Fitur pengaturan akun akan ditambahkan di versi selanjutnya.
      </p>
    </div>
  );
}
