import EventDetails from "@/app/component/molecules/eventdetails";
import { dummyEvents } from "@/app/data/dummy-events";
import { notFound } from "next/navigation";

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = dummyEvents.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-600">
      <EventDetails eventId={params.id} isLoggedIn={true} />
    </main>
  );
}
