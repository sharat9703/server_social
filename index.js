const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello guys!");
});
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(
      "Connected to MongoDB and the Server is listening on port " + port
    );
  });
});
