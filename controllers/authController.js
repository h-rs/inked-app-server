import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const createUser = async (req, res) => {
  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await User.findOne({ email: user.email });
    if (result) {
      res.status(409).send("User already exists.");
    } else {
      user.createdDate = new Date().toISOString();
      const newUser = new User(user);
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    passport.authenticate("local");
  } catch (error) {}
};
