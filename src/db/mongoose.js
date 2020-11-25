const mongoose = require("mongoose");

const uri = "";

try {
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => console.log("Connected to database")
  );
} catch (error) {
  console.log("Could not connect to database");
}
