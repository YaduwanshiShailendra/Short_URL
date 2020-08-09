const express = require("express");
const { MONGODB_URL, PORT } = require("./Config");
//importing file from Config/index
const app = express(); //top level function
const { connect } = require("mongoose");

//connect to database
connect(
  MONGODB_URL,
  { useNameUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("DATABASE CONNECTED");
  }
);

//express middleware json parsing
app.use(express.json({ extended: false })); //parsing json file

//load routes here
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

//PORT LISTEN
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("SERVER IS RUNNING ON PORT NUMBER" + PORT);
});
