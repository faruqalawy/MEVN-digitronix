import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import session from "express-session";
import MongoStore from "connect-mongo";
// import flash from "connect-flash"

import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/userModel.js";

import AuthRoute from "../routes/authRoute.js";
import CartRoute from "../routes/cartRoute.js";
import CategoryRoute from "../routes/categoryRoute.js";
import TransactionRoute from "../routes/transactionRoute.js";

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
    origin: [process.env.CLIENT_URL, process.env.VERCEL_CLIENT_URL],
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
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: 'sessions'
    }),
    rolling: true, // Updates the session expiration time each time a request is made
    cookie: {
      // domain: ".localhost",
      secure: "auto",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }, // 30 days in milliseconds (30 * 24 * 60 * 60)
  })
);

// passport middleware
// app.use(passport.authenticate('session'))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   console.log("Session:", req.session);
//   console.log("User:", req.user);
//   next();
// });

// app.use(flash())

// routes
app.use("/", AuthRoute);
app.use("/cart", CartRoute);
app.use("/categories", CategoryRoute);
app.use("/transactions", TransactionRoute);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running on port http://localhost:${process.env.APP_PORT}`
  );
});
