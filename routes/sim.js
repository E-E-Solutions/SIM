const express = require("express");
const router = express.Router();
const { create } = require("../controllers/create");
const {
  getAll,
  getByclientName,
  getBycompanyName,
  getSingleByIMSI,
  getSingleByICCID,
  getByLocation,
} = require("../controllers/find");
const { update, deleteField } = require("../controllers/update");
const { authenticateUser } = require("../middlewares/AuthentiateUser");
// create
router.route("/create").post(authenticateUser, create);
// get all
router.route("/all").get(authenticateUser, getAll);
//  get by IMSI NUMBER
router.route("/IMSI/:id").get(authenticateUser, getSingleByIMSI);
// get by ICCID
router.route("/ICCID/:id").get(authenticateUser, getSingleByICCID);
// get by client
router.route("/client/:id").get(authenticateUser, getByclientName);
// get by location
router.route("/location/:id").get(authenticateUser, getByLocation);
// get by company
router.route("/company/:id").get(authenticateUser, getBycompanyName);
// update by
router.route("/update/:id").patch(authenticateUser, update);
// deleteById
router.route("/remove/:id").delete(authenticateUser, deleteField);

module.exports = router;
