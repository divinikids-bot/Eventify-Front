import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/molecules/footer.module";
import { api } from "@/app/lib/axios";
import { EventCreatePayload } from "@/types/event.model";
import { useEvent } from "@/utils/useEvent";

interface EventDetailPageProps {
  params: { id: string };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const eventId = parseInt(params.id);
  const { getEventDetail } = useEvent();
  const data = await getEventDetail(Number(params.id));

  if (isNaN(eventId) || eventId <= 0) {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto p-4">
          <p className="text-red-600">Invalid Event ID</p>
        </main>
      </div>
    );
  }

  const res = await api.get(`/events/${eventId}`);
  const rawEvent = res.data;

  const event: EventCreatePayload = {
    ...rawEvent,
    imageUrl: rawEvent.imgUrl,
  };

  const startDate = new Date(event.startDateEvents);
  const endDate = new Date(event.endDateEvents);

  const formattedStartDate = startDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log("startdate >> ", startDate);

  const formattedStartTime = startDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndDate = endDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedEndTime = endDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-screen min-h-screen flex flex-col pt-20 bg-white text-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KIRI: Gambar + Deskripsi */}
          <div className="md:col-span-2">
            {data.imgUrl && (
              <img
                src={data.imgUrl !== "" ? data.imgUrl : "/logofinale.png"}
                alt={data.nameEvents || "Event Image"}
                className="w-full max-h-[500px] object-contain rounded-lg mb-6"
              />
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Deskripsi Event</h2>
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                {data.descriptionEvents}
              </p>
            </div>
          </div>

          {/* KANAN: Info Event + Card Beli Tiket */}
          <div className="flex flex-col gap-6">
            {/* Info Event */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h1 className="text-2xl font-bold mb-2">{data.nameEvents}</h1>
              <p className="text-sm text-gray-600 mb-1">
                📍 {data.locationEvents}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                📅 {formattedStartDate} - 🕒 {formattedStartTime}
              </p>
              {startDate.toDateString() !== endDate.toDateString() && (
                <p className="text-sm text-gray-600 mb-1">
                  Sampai: 📅 {formattedEndDate} - 🕒 {formattedEndTime}
                </p>
              )}
              <p className="text-sm text-gray-600">
                Kategori: {data.categoryEvents}
              </p>
              <p className="text-sm text-gray-600">
                Kursi tersedia: {data.availableSeats}
              </p>
            </div>

            {/* Beli Tiket */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Beli Tiket</h3>
              <p>Harga</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-yellow-500 font-bold text-xl">
                  Rp{Number(data.priceEvents).toLocaleString("id-ID")}
                </p>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Beli Tiket
              </button>

              <div className="mt-6 flex justify-center gap-4 text-gray-600">
                <button className="hover:text-blue-600">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="hover:text-blue-600">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="hover:text-blue-600">
                  <i className="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
