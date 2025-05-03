import { api } from "@/app/lib/axios";

export function useEvent() {
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

  async function updateEvent(idEvent: number) {}
  async function deleteEvent(idEvent: number) {}

  async function generateCoupon() {}

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    generateCoupon,
  };
}
