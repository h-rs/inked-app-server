import passport from "passport";
import { Strategy } from "passport-local";
import mongoose from "mongoose";
import debug from "debug";
import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

export const localStrategy = () => {
  passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        (async function validateUser() {
          try {
            const user = await User.findOne({ email });
            if (!user) {
              console.log("!user");
              done(null, false, { message: "Not a valid user" });
            } else if (await bcrypt.compare(password, user.password)) {
              const lastLogin = new Date().toISOString();
              const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { lastLoggedIn: lastLogin },
                { new: true }
              );

              done(null, updatedUser);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          } catch (error) {
            done(error, false);
          }
        })();
      }
    )
  );
};
