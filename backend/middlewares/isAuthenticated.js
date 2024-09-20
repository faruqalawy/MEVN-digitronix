export const isAuthenticated = (req, res, next) => {
    console.log("Session:", req.session);
    console.log("User:", req.user);
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You're unauthorized" });
    }
    next();
  }
  