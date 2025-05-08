// app/event/[id]/page.tsx
import EventDetails from '@/app/component/molecules/eventdetails';
import { notFound } from 'next/navigation';
import { EventCreatePayload } from '@/types/event.model';

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = Number(params.id);
  if (isNaN(eventId)) return notFound();

  try {
    const res = await fetch(`/pages/events/${eventId}`, {
      cache: 'no-store', // supaya data selalu fresh
    });

    if (!res.ok) return notFound();

    const event: EventCreatePayload = await res.json();

    return (
      <main className="min-h-screen bg-gray-50 text-gray-600">
        <EventDetails event={event} isLoggedIn={true} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching event:', error);
    return notFound();
  }
}
