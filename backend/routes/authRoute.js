import express from 'express';
import passport from 'passport';
import { register, login, logout, currentUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);
router.post("/logout", logout);
router.get("/currentUser", currentUser);

export default router;
