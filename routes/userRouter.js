import express from "express";
import { updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.put("/", updateUser);

export default userRouter;
