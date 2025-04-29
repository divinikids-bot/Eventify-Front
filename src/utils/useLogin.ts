import { api } from "@/app/lib/axios";
import { setAuthCookie } from "@/app/lib/cookies";

export function useLogin() {
  async function login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token, role, id } = response.data.data;
      console.log("=====respon data=====", response.data);

      setAuthCookie({
        token: access_token,
        role: role,
        userId: id,
        expiration: 7,
      });
      return {
        message: "Login berhasil",
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

  return {
    login,
  };
}
