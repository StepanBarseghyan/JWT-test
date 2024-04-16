import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class TokenService {
  static async generateAccessToken(payload) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
  }

  static async generateRefreshToken(payload) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "60s",
    });
  }
}

export default TokenService;
