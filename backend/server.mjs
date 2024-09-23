import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import session from "express-session";
import MongoStore from "connect-mongo";

import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/userModel.js";

import AuthRoute from "./routes/authRoute.js";
import CartRoute from "./routes/cartRoute.js";
import CategoryRoute from "./routes/categoryRoute.js";
import TransactionRoute from "./routes/transactionRoute.js";

dotenv.config();
const app = express();

// Mengaktifkan trust proxy
app.set('trust proxy', 3);

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["https://digitronix.vercel.app", "http://localhost:5173"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: "sessions",
      // autoRemove: "interval",
      // autoRemoveInterval: 1320,
    }),
    // rolling: true, // Updates the session expiration time each time a request is made
    cookie: {
      // domain: ".localhost",
      secure: 'auto',
      httpOnly: true,
      maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7
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

// passport.serializeUser(function(user, done) {
//   console.log("Serialized User:", user._id);
//   done(null, user._id);
// });

// passport.deserializeUser(async function(id, done) {
//   try {
//     const user = await User.findById(id);
//     console.log("Deserialized User:", user);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

// routes
app.use("/", AuthRoute);
app.use("/cart", CartRoute);
app.use("/categories", CategoryRoute);
app.use("/transactions", TransactionRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running on port http://localhost:${process.env.APP_PORT}`
  );
});
