const express = require("express");
const router = express.Router();
const WPAPI = require("wpapi");
const moment = require("moment-timezone");
const _ = require("lodash");

var wp = new WPAPI({ endpoint: "https://make.wordpress.org/core/wp-json" });

router.get("/", function (req, res, next) {
  const weeks = _.get(req, "query.weeks", 1);
  const start = moment().subtract(weeks, "weeks").format();
  const end = moment().format();

  wp.posts()
    .after(start)
    .before(end)
    .perPage(100)
    .get(function (err, data) {
      const zoneAbbr = moment().tz("America/Los_Angeles").zoneAbbr();
      const local = ' 13:00 ' + zoneAbbr;
      res.render("core", {
        title: "Recent Make/Core Posts from WordPress.org",
        pageTitle: "Dev Chat Agenda for " + moment().format("MMMM Do, YYYY"),
        posts: data,
        date: moment().format("MMMM Do, YYYY") + local,
      });
    });
});

module.exports = router;
