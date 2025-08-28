import jwt from "jsonwebtoken";
import { JWT_KEY } from "../utils/config.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  await jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
