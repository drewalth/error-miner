/**
 * Setup
 */
import dotenv = require("dotenv");
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import express = require("express");
const app = express();
const router = express.Router();
import bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
import chalk = require("chalk");

import morgan = require("morgan");

const morganMiddleware = morgan((tokens, req, res) => {
  return [
    chalk.hex("#ff4757").bold("⛏️  Miner --> "),
    chalk.hex("#34ace0").bold(tokens.method(req, res)),
    chalk.hex("#ffb142").bold(tokens.status(req, res)),
    chalk.hex("#ff5252").bold(tokens.url(req, res)),
    chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
    chalk.hex("#1e90ff")(tokens["user-agent"](req, res))
  ].join(" ");
});

app.use(morganMiddleware);

/**
 * crawl and click function
 */
import clickRandomTarget = require("./click-random-target");

/**
 * Parsers
 */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(helmet());
app.use(cors());

/**
 * Routes
 */
router.use((req, res, next) => {
  console.log("/" + req.method);
  next();
});

router.get("/ping", (req, res) => res.send("pong"));

router.post("/random-click", urlencodedParser, async (req, res) => {
  if (!req.body.url) {
    res.send("Error: Must provide URL.").status(422);
  }  else {
    res.json({ message: `Crawling and Clicking: ${req.body.url}` }).status(200);

    await clickRandomTarget({
      url: req.body.url,
      keyword: req.body.keyword || "",
      username: req.body.username || "",
      password: req.body.password || "",
      interval: req.body.interval || 5000,
      browsers: req.body.browsers
        ? req.body.browsers.split(",")
        : ["chrome", "firefox"],
      loopLimit: req.body.loopLimit ? Number(req.body.loopLimit) : 10,
    });
  }
});
app.use("/", router);
app.listen(port, () => {
  console.log(chalk.blue(`App listening on http://localhost:${port}`));
});
