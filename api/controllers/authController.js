import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TokenService from "../services/token.js";
import User from "../models/models.js";

class AuthController {
  static async registerUser(req, res) {
    const { username, password, email, name, surname, gender } = req.body;
    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.status(400).send({ message: "Username already exists" });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
        email,
        name,
        surname,
        gender,
      });
      await user.save();
      res.sendStatus(201);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send({ message: "Error registering user" });
    }
  }

  static async loginUser(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        const accessToken = await TokenService.generateAccessToken({
          username,
        });
        const refreshToken = await TokenService.generateRefreshToken({
          username,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        });

        res.json({ accessToken });
      } else {
        res.status(401).send({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).send({ message: "Error logging in" });
    }
  }

  static async logoutUser(req, res) {
    res.clearCookie("refreshToken");
    res.status(200).send({ message: "You have successfully logged out" });
  }

  static async refreshTokens(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send({ message: "Refresh token not found" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          return res.status(301).send({ message: "Redirecting to login page" });
        }

        const newAccessToken = await TokenService.generateAccessToken({
          username: user.username,
        });
        const newRefreshToken = await TokenService.generateRefreshToken({
          username: user.username,
        });

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        });

        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  }
}

export default AuthController;
