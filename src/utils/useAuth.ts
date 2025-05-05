import { api } from "@/app/lib/axios";
import { setAuthCookie } from "@/app/lib/cookies";

export function useAuth() {
  interface SignUpPayload {
    name: string;
    email: string;
    password: string;
    role: "USER" | "PROMOTOR";
    referralCode?: string;
    referredBy?: string;
  }

  async function signUp(data: SignUpPayload) {
    try {
      const response = await api.post("/users", data);
      const { access_token, role, id } = response.data.data;
      console.log("=====respon data=====", response.data);

      return {
        message: "Register berhasil",
        success: true,
      };
    } catch (error: any) {
      console.error("Sign Up Error: ", error);

      const errorMessage =
        error?.response?.data?.message || "Something went wrong";

      return {
        message: errorMessage,
        success: false,
      };
    }
  }

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
    } catch (error: any) {
      console.error("Login Error: ", error);

      const errorMessage =
        error?.response?.data?.message || "Something went wrong";

      return {
        message: errorMessage,
        success: false,
      };
    }
  }

  return {
    signUp,
    login,
  };
}
