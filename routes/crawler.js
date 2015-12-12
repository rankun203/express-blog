var express        = require('express');
var crawlerService = require('../service/crawler');

var router = express.Router();

router.route('/')
  .all(crawlerService.crawl);

module.exports = router;