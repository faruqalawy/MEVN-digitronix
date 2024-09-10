import User from "../models/userModel.js";
import passport from "passport";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    const sessionID = req.sessionID;
    req.login(registeredUser, (error) => {
      if (error) {
        console.error(error);
        return res
          .status(400)
          .json({message: "Login after registration failed: " + error.message});
      }
      res
        .status(201)
        .json({
          user: sessionID,
          message: "Login and Registration successful",
        });
    });
  } catch (error) {
    return res.status(400).json({message: "Registration failed: " + error.message});
  }
};

export const login = (req, res) => {
  // Pada titik ini, req.user sudah tersedia karena middleware passport.authenticate sudah memverifikasinya
  const sessionID = req.sessionID;

  console.log("Session ID: " + sessionID);
  console.log("User: ", req.user); // Anda bisa log data user untuk debugging jika diperlukan
  
  res.status(200).json({
    user: req.user,  // Mengirim data user yang sudah di-autentikasi
    sessionID: sessionID,
    message: "Login successful"
  });
};


export const logout = (req, res) => {
  req.logout((error) => {
    if (error) return res.status(500).json({ message: "Logout failed" });
    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ message: "Failed to destroy session" });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
  });
};

export const currentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "You must login!" });
  }
};
