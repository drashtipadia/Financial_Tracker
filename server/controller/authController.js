import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { JWT_KEY } from "../constant.js";

const generateToken = (id) => {
  // console.log(`generate Token method ${id}`);
  return jwt.sign({ id }, JWT_KEY, { expiresIn: "8h" });
};

export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already use" });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({
      fullname,
      email,
      hashedPassword,
    })
      .then((data) => {
        res
          .status(200)
          .json({ id: data._id, user: data, token: generateToken(data._id) });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(500).send(error);
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(400).json({ message: "Inavaild Credentials" });
    }
    bcrypt.compare(password, data.password, function (err, result) {
      if (err) {
        console.error("Error during password comparison:", err);
      } else {
        if (result) {
          res
            .status(200)
            .json({ id: data._id, user: data, token: generateToken(data._id) });
        } else {
          return res.status(400).json({ message: "Incorrect Password" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const getUserInfo = async (req, res) => {
  await User.findById(req.user.id)
    .select("-password")
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: "User not found" }));
};
