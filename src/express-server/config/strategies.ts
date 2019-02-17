import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import config from "../config/config.json";
import { ErrorCodes, ErrorMessages } from "../constants/index.js";
import { errorResponse } from "../helpers/responses.js";

export const useStrategies = () => {
  passport.serializeUser((user, done) => done(undefined, user));
  passport.deserializeUser((user, done) => done(undefined, user));

  passport.use("local", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, (req, email, password, done) => {
    const { email: userEmail, password: userPassword, } = config.userCreds;
    if (email !== userEmail || password !== userPassword) {
      return done(errorResponse({
        "code": ErrorCodes.NOTFOUND,
        "message": ErrorMessages.FAILEDAUTH,
        "extendedMessage": ErrorMessages.WRONGCREDENTIALS,
      }));
    }
    return done(undefined, config.userCreds);
  }));

  passport.use("facebook", new FacebookStrategy(config.facebookConfig,
    (token, updatedToken, profile, done) => {
    return done(undefined, profile);
  }));

  passport.use("twitter", new TwitterStrategy(config.twitterConfig,
    (token, updatedToken, profile, done) => {
    return done(undefined, profile);
  }));

  passport.use("google", new GoogleStrategy(config.googleConfig,
    (token, updatedToken, profile, done) => {
    return done(undefined, profile);
  }));
};
