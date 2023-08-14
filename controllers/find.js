const SIM = require("../utils/sqlQuery");
const { StatusCodes } = require("http-status-codes");
const { notFoundHandler } = require("../errorhandler/index");
const Client = require("../utils/client");

// get all
const getAll = async (req, res) => {
  const allSims = await SIM.findAll();
  res
    .status(StatusCodes.OK)
    .json({ sim: allSims[0], TotalSim: allSims[0].length });
};

// get single sim by client name
const getByclientName = async (req, res) => {
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
const getBycompanyName = async (req, res) => {
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
const getByLocation = async (req, res) => {
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
  sim = sim[0];
  let data = [];
  try {
    for (const e of sim) {
      let company = e.companyName;
      // sim = sim[0];
      data.push({
        company,
        sim: e,
      });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getByclientName,
  getBycompanyName,
  getSingleByICCID,
  getSingleByIMSI,
  getByLocation,
};
