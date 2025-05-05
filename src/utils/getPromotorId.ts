import { getAuthCookie } from "@/app/lib/cookies";

export const getPromotorId = (): string | null => {
    const { userId, role } = getAuthCookie();
  
    if (role === "PROMOTOR" && userId) {
      return userId; // Mengembalikan userId jika role adalah "PROMOTOR"
    }
    return null;
  };