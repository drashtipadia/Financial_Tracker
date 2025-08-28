import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const route = Router();
route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/getUser", protect, getUserInfo);

export default route;
