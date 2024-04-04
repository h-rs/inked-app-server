import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const user = req.body;
    if (mongoose.isValidObjectId(user.id)) {
      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { ...user },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      return res.status(404).send("Invalid Object_ID");
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
