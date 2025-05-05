import EventDetails from "@/app/component/molecules/eventdetails";

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-600">
      <EventDetails eventId={params.id} isLoggedIn={true} />
    </main>
  );
}
