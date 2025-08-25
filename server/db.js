import mongoose from "mongoose";
import { MONGO_URI } from "./utils/config.js";

if (MONGO_URI == undefined) {
  console.log("Mongo URI must be set in .env file");
  process.exit(1);
}
const connection = async () => {
  try {
    await mongoose
      .connect(`${MONGO_URI}`, {})
      .then(console.log("MongoDB connected successfully!"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connection();
