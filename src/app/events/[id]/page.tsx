
import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/molecules/footer.module";
import { api } from "@/app/lib/axios"; 
import { EventCreatePayload } from "@/types/event.model";
import { useEvent } from "@/utils/useEvent";

interface EventDetailPageProps {
  params: { id: string };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = parseInt(params.id);
  const { getAllEvent } = useEvent();

  console.log("====Params ID====", params.id);


  if (isNaN(eventId) || eventId <= 0) {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto p-4">
          <p className="text-red-600">Invalid Event ID</p>
        </main>
      </div>
    );
  }

  try {
    const res = await api.get(`/events/${eventId}`)
    const rawEvent = res.data;
    const event: EventCreatePayload = {
      ...res.data,
      imageUrl: rawEvent.imgUrl,
    };
    console.log("==== Response Data ====", res.data);


    const startDate = new Date(event.startDateEvents);
    const endDate = new Date(event.endDateEvents);

    const formattedStartDate = startDate.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

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
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="container mx-auto py-6 px-4">
          {event.imageUrl && (
            <img
              src={event.imageUrl&& event.imageUrl !== "" ? event.imageUrl : "/logofinale.png"}
              alt={event.nameEvents || "Event Image"}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="text-3xl font-bold mb-2">{event.nameEvents}</h1>
          <p className="text-gray-500 mb-1">Event ID: {eventId}</p>
          <p className="text-gray-600 mb-1">📍 {event.locationEvents}</p>
          <p className="text-gray-600 mb-1">
            📅 {formattedStartDate} - 🕒 {formattedStartTime}
          </p>
          {startDate.toDateString() !== endDate.toDateString() && (
            <p className="text-gray-600 mb-1">
              Sampai: 📅 {formattedEndDate} - 🕒 {formattedEndTime}
            </p>
          )}
          <p className="text-lg font-semibold text-yellow-600 mb-3">
            Rp{Number(event.priceEvents).toLocaleString("id-ID")}
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Deskripsi Event</h2>
            <p className="whitespace-pre-line">{event.descriptionEvents}</p>
          </div>
          <div className="border-t pt-4 mt-6">
            <h2 className="text-xl font-semibold mb-2">Kategori: {event.categoryEvents}</h2>
            <p className="text-gray-600">Tersedia: {event.availableSeats} kursi</p>
            <p className="text-gray-600">Organizer: {event.promotor?.usersId ?? "Tidak diketahui"}</p>
          </div>
        </div>
        

        <Footer />
      </div>
    );
  } catch (error: any) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto p-4">
          <p className="text-red-600">Event tidak ditemukan atau terjadi kesalahan</p>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }
}