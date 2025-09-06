import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  updatepwd,
} from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const route = Router();
route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/getUser", protect, getUserInfo);
route.put("/:id", protect, updateUserInfo);
route.post("/updatepwd", protect, updatepwd);

export default route;
