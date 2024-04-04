import passport from "passport";
import { localStrategy } from "./strategy/local.strategy.js";

export const passportConfig = (app) => {
  localStrategy();
  app.use(passport.initialize());
  app.use(passport.session());

  /**
   * Store the user
   */
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  /**
   * Retrieve the user
   */
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
