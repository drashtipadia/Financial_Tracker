import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controller/dashboardController.js";

const route = Router();
route.get("/", protect, getDashboardData);

export default route;
