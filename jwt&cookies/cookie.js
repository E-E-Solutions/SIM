const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
  return token;
};

const verifyJwtToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachedCookie = async ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;

  return await res.cookie("accesstoken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // secure: process.env.NODE_ENV === "production", // 'secure' instead of 'Secure'
    // signed: true,
    // sameSite: "same",
    SameSite: "None",
  });
};

module.exports = { attachedCookie, verifyJwtToken, createJWT };
