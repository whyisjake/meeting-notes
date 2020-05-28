const express = require('express');
const router = express.Router();
const WPCOM = require('wpcom');
const wpcom = WPCOM();
const moment = require('moment');
const _ = require('lodash');

router.get('/', function(req, res, next) {
  const weeks = _.get(req, 'query.weeks', 2);
  const twoWeeksAgo = moment().subtract(weeks, 'weeks').format();
  wpcom
  .site( 'lobby.vip.wordpress.com' )
	.postsList( 
    {
      after: twoWeeksAgo
    })
		.then( list => {
      res.render('index', { pageTitle: 'Recent Lobby Posts', posts: list.posts });
    } )
		.catch( 
      error => {
        console.error(error)
      } 
    );
});

module.exports = router;
