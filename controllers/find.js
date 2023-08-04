const SIM = require("../utils/sqlQuery");
const { StatusCodes } = require("http-status-codes");
const { notFoundHandler } = require("../errorhandler/index");

// get all
const getAll = async (req, res) => {
  const allSims = await SIM.findAll();
  res
    .status(StatusCodes.OK)
    .json({ sim: allSims[0], TotalSim: allSims[0].length });
};

// get single sim by client name
const getSingleByclientName = async (req, res) => {
  const client = req.params.id;
  const sim = await SIM.findWithClient(client);
  if (!sim[0][0]) {
    throw new notFoundHandler(
      "No sim found. Make sure u type a correct client name."
    );
  }
  res.status(StatusCodes.OK).json(sim[0]);
};

// get single sim by company name
const getSingleBycompanyName = async (req, res) => {
  const company = req.params.id;
  const sim = await SIM.findWithCompany(company);
  if (!sim[0][0]) {
    throw new notFoundHandler(
      "No sim found. Make sure u type a correct company name."
    );
  }
  res.status(StatusCodes.OK).json(sim[0]);
};

// get single sim by location.
const getSingleByLocation = async (req, res) => {
  const location = req.params.id;
  const sim = await SIM.findWithLocation(location);
  if (!sim[0][0]) {
    throw new notFoundHandler(
      "No sim found. Make sure u type a correct Location"
    );
  }
  res.status(StatusCodes.OK).json(sim[0]);
};

// get single sim by ICCID.
const getSingleByICCID = async (req, res) => {
  const ICCID = req.params.id;
  const sim = await SIM.findWithICCID(ICCID);
  if (!sim[0][0]) {
    throw new notFoundHandler(
      "No sim found. Make sure u type a correct Location"
    );
  }
  res.status(StatusCodes.OK).json(sim[0]);
};

// get single sim by IMSI.
const getSingleByIMSI = async (req, res) => {
  const IMSI = req.params.id;
  const sim = await SIM.findWithIMSI(IMSI);
  if (!sim[0][0]) {
    throw new notFoundHandler(
      "No sim found. Make sure u type a correct Location"
    );
  }
  res.status(StatusCodes.OK).json(sim[0]);
};

module.exports = {
  getAll,
  getSingleByclientName,
  getSingleBycompanyName,
  getSingleByICCID,
  getSingleByIMSI,
  getSingleByLocation,
};
