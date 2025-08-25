import { config } from "dotenv";
config();
export const PORT = process.env.PORT;
export const JWT_KEY = process.env.JWT_SECRET_KEY;
export const MONGO_URI = process.env.MONGO_URI;
