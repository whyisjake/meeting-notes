var express = require('express');
var router = express.Router();
var WPCOM = require('wpcom');
var wpcom = WPCOM();
var moment = require('moment');

router.get('/', function(req, res, next) {
  var twoWeeksAgo = moment().subtract(2, 'weeks').format();
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
