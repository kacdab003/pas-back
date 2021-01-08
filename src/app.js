const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const exchangeReportRouter = require("./routers/exchangeReport");
const moduleRouter = require("./routers/module");
const moduleStateARouter = require("./routers/moduleStateA");
const moduleStateBRouter = require("./routers/moduleStateB");
const moduleStateCRouter = require("./routers/moduleStateC");
const objectRouter = require("./routers/object");
const reportRouter = require("./routers/report");
const authRouter = require("./routers/auth");
const workersRouter = require("./routers/workers");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(exchangeReportRouter);
app.use(moduleRouter);
app.use(moduleStateARouter);
app.use(moduleStateBRouter);
app.use(moduleStateCRouter);
app.use(objectRouter);
app.use(reportRouter);
app.use(authRouter);
app.use(workersRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
