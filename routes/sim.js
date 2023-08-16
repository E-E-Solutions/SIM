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
router.route("/create").post(create);
// get all
router.route("/all").get(getAll);
//  get by IMSI NUMBER
router.route("/IMSI/:id").get(getSingleByIMSI);
// get by ICCID
router.route("/ICCID/:id").get(getSingleByICCID);
// get by client
router.route("/client/:id").get(getByclientName);
// get by location
router.route("/location/:id").get(getByLocation);
// get by company
router.route("/company/:id").get(getBycompanyName);
// update by
router.route("/update/:id").patch(update);
// deleteById
router.route("/remove/:id").delete(deleteField);
// authentication removed
module.exports = router;
