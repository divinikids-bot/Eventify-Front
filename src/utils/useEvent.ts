import { api } from "@/app/lib/axios";

export function useEvent() {
  interface EventUpdatePayload {
    title?: string;
    date?: string;
    location?: string;
    description?: string;
    [key: string]: any; // opsional, kalau ingin lebih fleksibel
  }

  async function getAllEvent() {
    try {
      const res = await api.get("/events");
      return res.data; // asumsinya array of events
    } catch (err) {
      console.error("Failed to fetch events:", err);
      return [];
    }
  }

  async function getEventsByPromotor(promotorId: string) {
    try {
      const response = await api.get(`/eventsByPromotor ${promotorId}`);
      return {
        data: response.data.data,
        success: true,
      };
    } catch (error) {
      console.error("Gagal fetch event promotor:", error );
      return {
        data: [],
        success: false,
      };
    }
  }

  async function createEvent(email: string, password: string) {
    try {
      const response = await api.post("/create-events", { email, password });
      const { access_token, role, id } = response.data.data;
      console.log("=====respon data=====", response.data);

      return {
        message: "Create event berhasil",
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error,
        success: false,
      };
    }
  }

  async function updateEvent(eventId: number, updatedData: EventUpdatePayload) {
    try {
      const response = await api.put(`/update-events${eventId}`, updatedData);
      return {
        message: "Update event berhasil",
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error,
        success: false,
      };
    }
  }

  async function deleteEvent(eventId: number) {
    try {
      const response = await api.delete(`/delete-events${eventId}`);
      return {
        message: "Event berhasil dihapus",
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error,
        success: false,
      };
    }
  }

  async function generateCoupon(eventId: number) {
    try {
      const response = await api.post(`/coupons/generate`, { eventId });
      return {
        message: "Kupon berhasil digenerate",
        success: true,
        data: response.data.data, // bisa berisi kode kupon
      };
    } catch (error) {
      console.log(error);
      return {
        message: error,
        success: false,
      };
    }
  }

  return {
    getAllEvent,
    getEventsByPromotor,
    createEvent,
    updateEvent,
    deleteEvent,
    generateCoupon,
  };
}
