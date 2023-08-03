const { StatusCodes } = require("http-status-codes");
const { notFoundHandler } = require("../errorhandler/index");
const SIM = require("../utils/sqlQuery");
const BadReqErrorHandler = require("../errorhandler/BadReq");

const update = async (req, res) => {
  const id = req.params.id;
  const { ICCID, IMSI, clientName, connectionType, location, companyName } =
    req.body;

  await SIM.updateById(req.body, id);
  try {
    let sim = await SIM.findWithId(id);
    res.status(StatusCodes.OK).json(sim[0]);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json(err);
  }
};

const deleteField = async (req, res) => {
  const id = req.params.id;
  await SIM.deleteById(id)
    .then(() => res.status(StatusCodes.OK).json("delete sucessfully."))
    .catch((err) => res.status(StatusCodes.BAD_REQUEST).json(err));
};

module.exports = { update, deleteField };
