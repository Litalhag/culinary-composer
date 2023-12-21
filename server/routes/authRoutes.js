import express from "express";
import {
  login,
  logout,
  register,
  getMe,
} from "../controllers/authContoller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);

export default router;
