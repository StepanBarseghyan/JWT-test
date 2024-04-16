import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/refresh", AuthController.refreshTokens);
router.get("/logout", AuthController.logoutUser);

export default router;
