import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/userModel.js";

import AuthRoute from "./routes/authRoute.js";
import CartRoute from "./routes/cartRoute.js";
import CategoryRoute from "./routes/categoryRoute.js";

const app = express();
dotenv.config();

// connect to database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173/login"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: "auto", httpOnly: true, maxAge: 60 * 60 * 24 * 30 }, // 30 days in milliseconds (30 * 24 * 60 * 60)
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use("/", AuthRoute);
app.use("/cart", CartRoute);
app.use("/categories", CategoryRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.APP_PORT}`);
});
