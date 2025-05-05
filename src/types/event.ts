export interface CreateEventPayload {
    nameEvents: string;
    categoryEvents: "MUSIC" | "SPORTS" | "FOOD" | "BEAUTY";
    priceEvents: string;
    descriptionEvents: string;
    locationEvents: "JAKARTA" | "BANDUNG" | "SURABAYA" | "BALI";
    startDateEvents: string; // format ISO date string (e.g., "2025-05-05")
    endDateEvents: string;
    availableSeats: number;
    promotorId: string;
  }