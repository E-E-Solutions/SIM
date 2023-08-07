const BadReqErrorHandler = require("../../errorhandler/BadReq");
const bcrypt = require("bcryptjs");
const User = require("../../utils/userSqlQuery");
const { StatusCodes } = require("http-status-codes");
const createTokenUser = require("../../jwt&cookies/userToken");
const { attachedCookie, createJWT } = require("../../jwt&cookies/cookie");
const jwt = require("jsonwebtoken");

// registeration
const register = async (req, res) => {
  let { userName, email, password, role } = req.body;
  if (!userName || !email || !password) {
    throw new BadReqErrorHandler("Please provide complete details");
  }
  // password encryption
  let salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  let user = new User(userName, email, password, role);
  await user.save();
  try {
    user = await User.findWithEmail(email);
    res.status(StatusCodes.CREATED).json(user[0]);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};

// login
const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    throw new BadReqErrorHandler("Please provide complete details.");
  }
  const user = await User.findWithEmail(email);
  const isPasswordCorrect = await bcrypt.compare(password, user[0][0].password);
  if (!isPasswordCorrect) {
    throw new BadReqErrorHandler("password is not correct");
  }
  const userToken = createTokenUser(user);
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
  await attachedCookie({ res, user: userToken });
  res.status(StatusCodes.OK).json({ user: userToken, token: token });
};

// logout
const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "logout successful" });
};

module.exports = { register, login, logout };
