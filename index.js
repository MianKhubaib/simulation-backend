const bleRouter = require("./routes/ble");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://miankhubaib.github.io/"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", bleRouter);

app.listen(process.env.PORT || 3001, () =>
  console.log(`Listening on port ${process.env.PORT || 3001}...`)
);
