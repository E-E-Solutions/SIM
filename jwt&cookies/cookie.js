const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
  return token;
};

const verifyJwtToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachedCookie = ({ res, payload }) => {
  console.log(payload);
  const token = createJWT({ payload: payload });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = { attachedCookie, verifyJwtToken };
