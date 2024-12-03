const express = require("express");
const router = express.Router();
const WPCOM = require("wpcom");
const wpcom = WPCOM();
const moment = require("moment");
const _ = require("lodash");

router.get("/", function (req, res, next) {
  const weeks = _.get(req, "query.weeks", 2);
  const quarter = _.get(req, "query.quarter", false);
  const year = _.get(req, "query.year", false);

  let start = moment().subtract(weeks, "weeks").format();
  let end;

  if (quarter && year) {
    let time = moment(year).add(quarter - 1, "quarter");
    start = time.startOf("quarter").format();
    end = time.endOf("quarter").format();
  }

  // Get the last 100 posts from the VIP changelog.
  // https://wpvipchangelog.wordpress.com/
  // And then store them in the posts variable.
  wpcom
    .site("wpvipchangelog.wordpress.com")
    .postsList({
      after: start,
      before: end,
      number: 100,
    })
    .then((changelog) => {
      wpcom
        .site("lobby.vip.wordpress.com")
        .postsList({
          after: start,
          before: end,
          number: 100,
        })
        .then((lobby) => {
          res.render("index", {
            title: "Recent WordPress.com VIP Lobby Posts",
            changelogTitle: "Recent VIP Changelog Posts",
            pageTitle: "Recent Lobby Posts",
            posts: lobby.posts,
            changelog: changelog.posts,
          });
        });
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
