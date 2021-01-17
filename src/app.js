const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const exchangeReportRouter = require("./routers/exchangeReport");
const reportRouter = require("./routers/report");
const authRouter = require("./routers/auth");
const workersRouter = require("./routers/workers");
const notFoundRouter = require("./routers/404");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(exchangeReportRouter);
app.use(reportRouter);
app.use(authRouter);
app.use(workersRouter);
app.use(notFoundRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
