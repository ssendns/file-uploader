const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/sign-up", authController.signUpGet);
router.post("/sign-up", authController.signUpPost);
router.get("/log-in", authController.logInGet);
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);
router.get("/logout", authController.logOutGet);

module.exports = router;
