const express = require("express");
const router = express.Router();
const { create } = require("../controllers/create");
const {
  getAll,
  getSingleByclientName,
  getSingleBycompanyName,
} = require("../controllers/find");
const { update, deleteField } = require("../controllers/update");
const { authenticateUser } = require("../middlewares/AuthentiateUser");
// create
router.route("/create").post(create, authenticateUser);
// get all
router.route("/all").get(getAll, authenticateUser);
// get by client
router.route("/client/:id").get(getSingleByclientName, authenticateUser);
// get by company
router.route("/company/:id").get(getSingleBycompanyName, authenticateUser);
// update by
router.route("/update/:id").patch(update, authenticateUser);
// deleteById
router.route("/remove/:id").delete(deleteField, authenticateUser);

module.exports = router;
