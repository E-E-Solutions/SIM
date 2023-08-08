const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
} = require("../controllers/auth/registerLogin");
const {
  userRoleVerification,
  authenticateUser,
} = require("../middlewares/AuthentiateUser");

// register
router
  .route("/register")
  .post(authenticateUser, userRoleVerification("admin"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
