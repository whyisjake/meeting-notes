const express = require('express');
const router = express.Router();
const WPCOM = require('wpcom');
const wpcom = WPCOM();
const moment = require('moment');

router.get('/', function(req, res, next) {
  const twoWeeksAgo = moment().subtract(2, 'weeks').format();
  console.log(twoWeeksAgo);
  wpcom
  .site( 'lobby.vip.wordpress.com' )
	.postsList( 
    { 
      number: 8,
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
