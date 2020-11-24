require("dotenv").config();
const mongoose = require("mongoose");

try {
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    () => console.log("Connected to database")
  );
} catch (error) {
  console.log("Could not connect to database");
}
