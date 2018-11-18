const express = require("express");
const app = express();
const fs = require("fs");
const sqlite = require("sql.js");
const filebuffer = fs.readFileSync("server/db/stockAPI.db");

const db = new sqlite.Database(filebuffer);

app.set("port", process.env.PORT || 3001);



const COLUMNS = [
  "Symbol",
  "Name",
  "MarketCap",
  "Sector",
  "Industry"
];
app.get("/api/stocks", (req, res) => {
 

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(
    `
    select ${COLUMNS.join(", ")} from StockTable
    limit 1000
  `
  );

  if (r[0]) {
    res.json(
      r[0].values.map(entry => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          
            e[c] = entry[idx];
          
        });
        return e;
      })
    );
  } else {
    res.json([]);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

