const {
  unAuthenticationHandler,
  unAuthorizedHandler,
} = require("../errorhandler");
const { verifyJwtToken } = require("../jwt&cookies/cookie");

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new unAuthenticationHandler(
      "You are not authenticated because you did not have token"
    );
  }

  try {
    const { userName, userId, role } = verifyJwtToken({ token });
    req.user = { userName, userId, role };
    next();
  } catch (err) {
    console.log(err);
    throw new unAuthenticationHandler(
      "You are not authenticated because yor token is not valid"
    );
  }
};

const userRoleVerification = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new unAuthorizedHandler(
        "sorry your role is different you are not authorized."
      );
    }
    next();
  };
};

module.exports = { authenticateUser, userRoleVerification };
