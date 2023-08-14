const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customApiError = {
    statuscode: err.statusCode || StatusCodes.BAD_REQUEST,
    msg: err.message || "Something went wrong Please try again.",
  };
  if (err.code == "ER_DUP_ENTRY") {
    customApiError.statuscode = StatusCodes.BAD_REQUEST;
    customApiError.msg = "Already have a sim with same details. " + err.sqlMessage;
  }

  return res
    .status(customApiError.statuscode)
    .json({ msg: customApiError.msg });
};

module.exports = errorHandlerMiddleware;
