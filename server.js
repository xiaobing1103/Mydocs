const express = require("express");
const fs = require("fs");
const app = express();
const { resolve } = require("path");
const filePath = resolve(__dirname, "./docs/index.html");
const rs = fs.createReadStream(filePath);

app.use(express.static("./docs"));

app.get("/", (req, res) => {
  rs.pipe(res);
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("访问 http://localhost:3000");
});
