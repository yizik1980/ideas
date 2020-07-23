var express = require("express");
var router = express.Router();
var querystring = require("querystring");
var http = require("http");
const Msg = require("./../errorMsg");
const WRequest = require("./../weatherReqests");

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/getLocation/:q", function (req, res) {
  const qParams = req.params.q;
  if (!qParams) {
    res.json(new Msg("no query q String", 1));
    return;
  }
  if (qParams.length < 2) {
    res.json(new Msg("query is too short", 2));
    return;
  }
  if (qParams.length > 10) {
    res.json(new Msg("query is too long", 3));
    return;
  }
  const wr = new WRequest();
  wr.getLocation(function (chunk) {
    console.log("body: " + chunk);
    res.json(chunk);
  }, qParams);
});

router.get("/getCurrentWeather/:keyLocation", (req, res) => {
  const key = req.params.keyLocation;
  if (!key) {
    res.json(new Msg("no query q String", 1));
    return;
  }
  if (key.length < 2) {
    res.json(new Msg("query is too short", 2));
    return;
  }
  const wr = new WRequest();
  wr.getCurrentWeather((chunk) => {
    console.log("body: " + chunk);
    res.json(chunk);
  }, key);
});
router.get("/getForcastWeather/:keyLocation", (req, res) => {
  const key = req.params.keyLocation;
  if (!key) {
    res.json(new Msg("no query q String", 1));
    return;
  }
  if (key.length < 2) {
    res.json(new Msg("query is too short", 2));
    return;
  }
  const wr = new WRequest();
  wr.getForcastWeather((chunk) => {
    //console.log("body: " + chunk);
    res.json(chunk);
  }, key);
});
module.exports = router;
