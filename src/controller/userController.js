import dotenv from "dotenv";
dotenv.config();
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import  userModel  from "../models/user.model.js"


// Debug: Check if JWT_SECRET is loaded
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
const JWT_SECRET = "hfhfhfhfh";
const demo = async (req, res) => {
  res.send("demo success");
};

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate request fields
    if (!username || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const error = createHttpError(400, "User already exists");
      return next(error);
    }

    // Hash the password
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, "All fields are required");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createHttpError(401, "Password is incorrect");
    }

    // Check if username exists, and if not, create a unique username
    if (!user.username) {
      const userId = user._id  // Type assertion to ObjectId
      const uniqueUsername = `${user.username.replace(/\s+/g, '').toLowerCase()}_${userId.toString().slice(-4)}`;
      user.username = uniqueUsername;
      await user.save();
    }

    // Create access token
    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      JWT_SECRET ,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      accesstoken: token,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};

export { demo, createUser, loginUser };
