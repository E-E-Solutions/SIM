const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
} = require("../controllers/userController/registerLogin");
const {
  userRoleVerification,
  authenticateUser,
} = require("../middlewares/AuthentiateUser");

// register
router
  .route("/register", authenticateUser, userRoleVerification("admin"))
  .post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
