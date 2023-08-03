const express = require("express");
const router = express.Router();
const { create } = require("../controllers/create");
const {
  getAll,
  getSingleByclientName,
  getSingleBycompanyName,
} = require("../controllers/find");
const { update, deleteField } = require("../controllers/update");
// create
router.route("/create").post(create);
// get all
router.route("/all").get(getAll);
// get by client
router.route("/client/:id").get(getSingleByclientName);
// get by company
router.route("/company/:id").get(getSingleBycompanyName);
// update by
router.route("/update/:id").patch(update);
// deleteById
router.route("/remove/:id").delete(deleteField);

module.exports = router;
