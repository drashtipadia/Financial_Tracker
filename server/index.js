import express from "express";
import cors from "cors";
import { PORT } from "./utils/config.js";
import "./db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use((_, res, next) => {
  res.setHeader("Content-Security-Policy");
  next();
});

app.get("/", function (_, res) {
  res.send({ checkHealth: "done" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
