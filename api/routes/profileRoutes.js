import express from "express";
import profileController from "../controllers/profileController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/profile", authenticateToken, profileController.getPosts);

export default router;
