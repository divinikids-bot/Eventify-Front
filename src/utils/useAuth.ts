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

  function validateSignUp(data: SignUpPayload) {
    if (!data.name || !data.email || !data.password || !data.role) {
      return "All fields are required!";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
      return "Invalid email format.";
    }

    if (data.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return null;
  }

  async function signUp(data: SignUpPayload) {
    // Validasi data sebelum dikirim
    const errorMessage = validateSignUp(data);
    if (errorMessage) {
      return { message: errorMessage, success: false };
    }

    //>>>>>>>>>>>>>>>>>>>>>>>>> ada error disini saat signUp <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    console.log("========Data Cek=========", data);
    try {
      const response = await api.post("/users", 
         {
          name: data.name,
          email: data.email,
          password: data.password,
          role:data.role,
          referralCode: data.referralCode,
          referredBy: data.referredBy
        }
    );
      // const { access_token, role, id } = response.data.data;
      console.log("=====respon data=====", response.data);

      return {
        message: "Register berhasil",
        success: true,
      };
    } catch (error: any) {
      console.error("Sign Up Error: ", error);

      const errorMessage =
        error?.response?.data?.message || "Something went wrong :" + error;

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
