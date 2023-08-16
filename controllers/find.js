const SIM = require("../utils/sqlQuery");
const { StatusCodes } = require("http-status-codes");
const { notFoundHandler } = require("../errorhandler/index");
const Client = require("../utils/client");

// get alll
const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.size) || 10;
  const offSet = (page - 1) * pageSize;
  let allClient = await Client.findAll(pageSize, offSet);
  allClient = allClient[0];
  let data = [];
  try {
    for (const e of allClient) {
      let company = e.companyName;
      let allSims = await SIM.findWithCompany(company, pageSize, offSet);
      allSims = allSims[0];
      data.push({
        companyId: e.id,
        company,
        allSims,
      });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// get single sim by client name
const getByclientName = async (req, res) => {
  const client = req.params.id;
  let sim = await SIM.findWithClient(client);
  if (!sim[0][0]) {
    throw new notFoundHandler(
      "No sim found. Make sure u type a correct client name."
    );
  }
  sim = sim[0];
  let data = [];
  try {
    for (const e of sim) {
      let company = e.companyName;
      data.push({
        companyId: e.companyId,
        company,
        allSims: [e],
        length: e.length,
      });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// get single sim by company name
const getBycompanyName = async (req, res) => {
  const company = req.params.id;
  let sim = await SIM.findWithCompany(company, 20, 0);
  if (!sim[0][0]) {
    throw new notFoundHandler(
      "No sim found. Make sure u type a correct company name."
    );
  }

  sim = sim[0];
  let data = [];
  try {
    for (const e of sim) {
      let company = e.companyName;
      data.push({
        companyId: e.companyId,
        company,
        allSims: [e],
        length: e.length,
      });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// get single sim by location.
const getByLocation = async (req, res) => {
  const location = req.params.id;
  let sim = await SIM.findWithLocation(location);
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
      data.push({
        companyId: e.companyId,
        company,
        allSims: [e],
        length: e.length,
      });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// get single sim by ICCID.
const getSingleByICCID = async (req, res) => {
  const ICCID = req.params.id;
  const len = ICCID.length;
  let sim = await SIM.findWithICCID(len, ICCID);
  if (!sim[0][0]) {
    throw new notFoundHandler("No sim found. Make sure u type a correct ICCID");
  }
  sim = sim[0];
  let data = [];
  try {
    for (const e of sim) {
      let company = e.companyName;
      data.push({
        companyId: e.companyId,
        company,
        allSims: [e],
        length: e.length,
      });
    }
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

// get single sim by IMSI.
const getSingleByIMSI = async (req, res) => {
  const IMSI = req.params.id;
  const len = IMSI.length;
  let sim = await SIM.findWithIMSI(len, IMSI);
  if (!sim[0][0]) {
    throw new notFoundHandler("No sim found. Make sure u type a correct IMSI");
  }
  sim = sim[0];
  let data = [];
  try {
    for (const e of sim) {
      let company = e.companyName;
      // sim = sim[0];
      data.push({
        companyId: e.companyId,
        company,
        allSims: [e],
        length: e.length,
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
  getSingleByICCID,
};
