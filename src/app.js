const express = require("express");
require("./db/mongoose");
const reportRouter = require("./routers/report");
const userRouter = require("./routers/user");

const app = express();
const PORT = process.env.PORT || 3000;

// app.use("/", (req, res, next) => {
//   res.send("Hello world!");
// });

app.use(express.json());
app.use(reportRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
