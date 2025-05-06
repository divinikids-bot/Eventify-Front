export interface EventCreatePayload {
  eventId : number
  nameEvents: string;
  categoryEvents: "MUSIC" | "SPORTS" | "FOOD" | "BEAUTY";
  priceEvents: string;
  descriptionEvents: string;
  locationEvents: "JAKARTA" | "BANDUNG" | "SURABAYA" | "BALI";
  startDateEvents: string;
  endDateEvents: string;
  availableSeats: number;
  coupon?: {
    discount: number;
  };
}

export interface EventUpdatePayload {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: "MUSIC" | "SPORTS" | "FOOD" | "BEAUTY";
  price: string;
}
