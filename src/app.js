const { request } = require("express");
const express = require("express");
require("./db/mongoose");
const exchangeReportRouter = require("./routers/exchangeReport");
const moduleRouter = require("./routers/module");
const moduleStateARouter = require("./routers/moduleStateA");
const moduleStateBRouter = require("./routers/moduleStateB");
const moduleStateCRouter = require("./routers/moduleStateC");
const objectRouter = require("./routers/object");
const reportRouter = require("./routers/report");
const userRouter = require("./routers/user");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3000;

// app.use("/", (req, res, next) => {
//   res.send("Hello world!");
// });

app.use(express.json());
app.use(exchangeReportRouter);
app.use(moduleRouter);
app.use(moduleStateARouter);
app.use(moduleStateBRouter);
app.use(moduleStateCRouter);
app.use(objectRouter);
app.use(reportRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

const Logowanie = async () => {
  const token = jwt.sign({ _id: "Admin" },"password", {expiresIn: "7 days"});
  console.log(token);

  const data = jwt.verify(token ,"password");
  console.log(data);
};

Logowanie();