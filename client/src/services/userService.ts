import { AxiosError } from "axios";
import api from "./axiosService";

class UserApi {
  static async fetchPosts() {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
}

export default UserApi;
