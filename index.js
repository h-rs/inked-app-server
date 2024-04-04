import express from "express";
import dotEnv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import entriesRouter from "./routes/entriesRouter.js";
import authRouter from "./routes/authRouter.js";
import { passportConfig } from "./config/passport.js";
import expressSession from "express-session";
import userRouter from "./routes/userRouter.js";
import passport from "passport";

const server = express();
dotEnv.config();

const PORT = process.env.PORT || 7789;
const uri = process.env.CONNECTION_URI;

server.use(bodyParser.json()).use(cors());

server.use(express.urlencoded({ extended: false }));
server.use(
  expressSession({ secret: "inked", resave: false, saveUninitialized: true })
);
passportConfig(server);

server.use("/auth", authRouter);
server.use("/entries", entriesRouter);
server.use("/user", userRouter);

//server.use(passport.session());

server.get("/", (req, res) => {
  res.send("Welcome to INKED app");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log(`Database connectionn established successfully.`);
    console.log(`----------------------------------------------`);
    server.listen(PORT, () => {
      console.log(`***** Server listening on PORT ${PORT} `);
    });
  })
  .catch((error) => {
    console.log(`An error occured: ${error}`);
  });
