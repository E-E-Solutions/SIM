const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/ErrorMiddleware");
const notFoundHandler = require("./middlewares/notFound");
const app = express();
const formRoute = require("./routes/sim");
const authRoute = require("./routes/user");
const morgan = require("morgan");
// app.js
app.use(express.json());
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser(process.env.JWT_SECRET));
// routes
app.use("/ene/sim/", formRoute);
app.use("/ene/sim/auth/", authRoute);
// middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundHandler);
// morgan
app.use(morgan("dev"));
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
