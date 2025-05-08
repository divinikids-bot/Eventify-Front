export interface Coupond {
  code: string;
  discount: number;
}

export interface Promotor {
  usersId: number;
  name: string;
  image?: string;
}

export interface EventCreatePayload {
  eventId?: number;
  nameEvents: string;
  categoryEvents: "MUSIC" | "SPORTS" | "FOOD" | "BEAUTY";
  priceEvents: string;
  descriptionEvents: string;
  locationEvents: "JAKARTA" | "BANDUNG" | "SURABAYA" | "BALI";
  startDateEvents: string;
  endDateEvents: string;
  availableSeats: number;
  couponds?: Coupond[];
  promotor?: Promotor;
  imageUrl?: string;
}

export interface EventList {
  eventId: number;
  nameEvents: string;
  startDateEvents: string;
  endDateEvents: string;
  ticketsSold: number;
  status: string;
}

export interface EventUpdatePayload extends Partial<EventCreatePayload> {
  eventId: number;
}

export type EventData = {
  id: string;
  namaEvent: string;
  lokasiEvent: string;
  tanggalEvent: string;
  imageUrl?: string;
};

export type TicketOption = {
  id: string;
  title: string;
  price: number;
  quota?: number;
  eventId: string;
  saleStartDate?: string;
  saleEndDate?: string;
  discountPercentage?: number;
};