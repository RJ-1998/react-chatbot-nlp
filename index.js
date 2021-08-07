const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(4001, () => {
  console.log(`Example app listening at...`);
});
