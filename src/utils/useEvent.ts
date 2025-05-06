import { api } from "@/app/lib/axios";
import { getAuthCookie } from "@/app/lib/cookies";
import { EventCreatePayload } from "@/types/event.model";
import { EventUpdatePayload } from "@/types/event.model";

export function useEvent() {
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
      const result = getAuthCookie()
      const response = await api.get(`/eventsByPromotor/${promotorId}`, {
        headers: {
          'Authorization' : `Bearer ${result.token}`
        }
      });
      return {
        data: response.data.data,
        success: true,
      };
    } catch (error) {
      console.error("Gagal fetch event promotor:", error);
      return {
        data: [],
        success: false,
      };
    }
  }

  async function createEvent(EventCreate: EventCreatePayload) {
    try {
      const { token } = getAuthCookie();
      const response = await api.post("/create-events", EventCreate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        message: "Event berhasil dibuat",
        success: true,
        data: response.data.data,
      };
    } catch (error: any) {
      console.error("Create event error:", error);
      return {
        message: error.response?.data?.message || "Terjadi kesalahan",
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
