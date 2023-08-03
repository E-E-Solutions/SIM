const express = require("express");
require("express-async-errors");
const errorHandlerMiddleware = require("./middlewares/ErrorMiddleware");
const notFoundHandler = require("./middlewares/notFound");
const app = express();
const formRoute = require("./routes/sim");
const morgan = require("morgan");
// app.js
app.use(express.json());
// routes
app.use("/ene/sim/", formRoute);
// middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundHandler);
// morgan
app.use(morgan("dev"));
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
