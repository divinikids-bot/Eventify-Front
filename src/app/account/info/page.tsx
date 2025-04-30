export default function AccountInfoPage() {
    const profile = {
      full_name: "Budi Santoso",
      email: "budi@example.com",
      phone: "081234567890",
    };
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Informasi Dasar</h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Nama:</strong> {profile.full_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>No. HP:</strong> {profile.phone}</p>
        </div>
      </div>
    );
  }
  