const { StatusCodes } = require("http-status-codes");
const { notFoundHandler } = require("../errorhandler/index");
const SIM = require("../utils/sqlQuery");
const BadReqErrorHandler = require("../errorhandler/BadReq");

// creating new sim
const create = async (req, res) => {
  const { ICCID, IMSI, clientName, connectionType, location, companyName } =
    req.body;
  if (
    !ICCID ||
    !IMSI ||
    !clientName ||
    !connectionType ||
    !location ||
    !companyName
  ) {
    throw new notFoundHandler("Please provide complete details ");
  }
  if (IMSI.length != 15) {
    throw new BadReqErrorHandler("please provide a correct IMSI number");
  }
  let sim = new SIM(
    ICCID,
    IMSI,
    clientName,
    connectionType,
    location,
    companyName
  );
  await sim.save();
  try {
    sim = await SIM.findWithIMSI(IMSI);
    sim = sim[0][0];
    res.status(StatusCodes.CREATED).json(sim);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

module.exports = { create };
