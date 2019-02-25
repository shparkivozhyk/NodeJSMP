import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import config from "../config/authConfig.json";

import { ErrorMessages } from "../constants/index.js";

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
      done(ErrorMessages.WRONGCREDENTIALS);
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

  passport.use("github", new GithubStrategy(config.githubConfig,
    (token, updatedToken, profile, done) => {
      return done(undefined, profile);
    }));
};
