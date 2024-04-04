import express from "express";
import { createUser, login } from "../controllers/authController.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/sign-up", createUser);

//authRouter.post("/login", login);

// authRouter.post(
//   "/login",
//   passport.authenticate("local", {
//     session: true,
//   }),
//   function (req, res, next) {
//     if (req.user) {
//       res.json(req.user);
//     } else {
//       res.statusCode = 503;
//       res.send({ message: "Not Found" });
//     }
//   }
// );

authRouter.post(
  "/login",
  passport.authenticate("local", {
    session: true,
  }),
  function (req, res, next) {
    try {
      if (req.user) {
        res.json(req.user);
      } else {
        console.log("else");
        res.statusCode = 503;
        res.send({ message: "Not Found" });
      }
    } catch (error) {
      console.log("error");
    }
  }
);

export default authRouter;
