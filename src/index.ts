import express, { json } from "express";
import { promises as fsPromises } from "fs";
import csv from "csvtojson";
import path from "path";
//
const app = express();
const port = 3000;
//
const routes = express.Router();
routes.get("/convert", (req, res) => {
  csv2jsonFile();
  res.send("data converted");
});
app.use(routes);
//
app.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});
//
// console.log(
//   path.join(__dirname, "..", "/users.json"),
//   path.join(__dirname, "..", "users.csv")
// );

const csv2jsonFile = async () => {
  try {
    let csvData = await csv().fromFile(path.join(__dirname, "..", "users.csv"));
    csvData.forEach((e) => {
      if (e.phone.length == 0) {
        e.phone = "missing data";
      }
    });
    const str = JSON.stringify(csvData);
    const file = await fsPromises.open(
      path.join(__dirname, "..", "/users.json"),
      "w+"
    );
    file.write(str);
  } catch (err) {
    console.log(err);
  }
};
