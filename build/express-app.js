const express = require("express");

const app = express();

const baseDir = `./`;

app.use(express.static(`${baseDir}`));

app.get("*", (req, res) => res.sendFile("index.html", { root: baseDir }));

const port = 3021;

app.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
