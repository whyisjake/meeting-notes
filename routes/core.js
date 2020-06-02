const express = require("express");
const router = express.Router();
const WPAPI = require("wpapi");
const moment = require("moment");
const _ = require("lodash");

var wp = new WPAPI({ endpoint: "https://make.wordpress.org/core/wp-json" });

router.get("/", function (req, res, next) {
  const weeks = _.get(req, "query.weeks", 2);
  const start = moment().subtract(weeks, "weeks").format();
  const end = moment().format();

  // Callbacks
  wp.posts()
    .after(start)
    .before(end)
    .perPage(100)
    .get(function (err, data) {
      res.render("core", {
        title: "Recent Make/Core Posts from WordPress.org",
        pageTitle: "Recent Make/Core Posts",
        posts: data,
      });
    });
});

module.exports = router;
