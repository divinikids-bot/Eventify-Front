// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { dummyEvents, dummyReviews, EventData, Review } from '../data/dummy-events';
// import StarRating from './starsRating';

// const EventDetail = ({ eventId }: { eventId: string }) => {
//   const router = useRouter();
//   const [event, setEvent] = useState<EventData | null>(null);
//   const [reviews, setReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     const foundEvent = dummyEvents.find((e) => e.id === eventId);
//     const eventReviews = dummyReviews.filter((r) => r.eventId === eventId);

//     if (!foundEvent) {
//       router.push('/not-found');
//     } else {
//       setEvent(foundEvent);
//       setReviews(eventReviews);
//     }
//   }, [eventId, router]);

//   if (!event) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
//       <h1 className="text-3xl font-bold mb-4 text-gray-600">{event.namaEvent}</h1>
//       <p className="mb-2 text-gray-600">{event.deskripsiEvent}</p>
//       <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-600">Ulasan</h2>
//       {reviews.length === 0 ? (
//         <p>Belum ada ulasan.</p>
//       ) : (
//         reviews.map((review) => (
//           <div key={review.id} className="mb-4 border-b pb-2">
//             <p className="font-semibold">{review.userName}</p>
//             <StarRating rating={review.rating} />
//             <p>{review.comment}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default EventDetail;
