import { AxiosError } from "axios";
import { LoginFields, RegisterFields } from "../types/types";
import api from "./axiosService";

class AuthApi {
  static async registerUser(data: RegisterFields) {
    try {
      await api.post("/auth/register", data);
    } catch (error) {
      console.error("Error while registering:", error);
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    }
  }

  static async loginUser({ username, password }: LoginFields) {
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    console.log("respooonse", response);
    localStorage.setItem("accessToken", response.data.accessToken);
  }

  static async refreshTokens() {
    const response = await api.get("/auth/refresh");
    localStorage.setItem("accessToken", response.data.accessToken);
  }

  static async logoutUser() {
    try {
      await api.get("/auth/logout");
      localStorage.removeItem("accessToken");
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message);
    }
  }
}

export default AuthApi;
