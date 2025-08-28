import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { JWT_KEY } from "../utils/config.js";

const generateToken = (id) => {
  // console.log(`generate Token method ${id}`);
  return jwt.sign({ id }, JWT_KEY, { expiresIn: "8h" });
};

//===============================
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
    await User.create({
      fullname,
      email,
      password,
    })
      .then((data) => {
        const token = generateToken(data._id);
        res
          .status(201)
          // .json({ user: data, token: generateToken(data._id) });
          .send({
            status: "success",
            message: "Register successfully",
            payload: { token, data },
          });
      })
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(500).send(error);
  }
};

//=======================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Inavaild Credentials" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.error("Error during password comparison:", err);
      } else {
        if (result) {
          //res.status(200).json({ user: user, token: generateToken(user._id) });
          const token = generateToken(user._id);
          res.status(200).send({
            status: "success",
            message: "Logged in successfully",
            payload: { token, user },
          });
        } else {
          return res.status(400).json({ message: "Incorrect Password" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//==========================
export const getUserInfo = async (req, res) => {
  await User.findById(req.user.id)
    .select("-password")
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(400).json({ message: "User not found" }));
};
