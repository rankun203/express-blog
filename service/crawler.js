/**
 * Created on 7/12/15.
 * @author rankun203
 */
var superagent = require('superagent');
var cheerio    = require('cheerio');
var urlModule  = require('url');

function cb(res, err, data) {
  if (err)
    res.status(500).send(err).end();
  else if (data == null)
    res.status(404).end();
  else
    res.json(data);
}

var CrawlerService = {
  crawl: function (req, res, next) {
    var url   = req.body.url;
    var query = req.body.query;

    superagent
      .get(url)
      .end(function (err, html) {
        if (err) return cb(res, err, null);

        var $      = cheerio.load(html.text);
        var result = $(query);

        var data = [];
        result.each(function (idx, ele) {
          data.push({
            title: ele.attribs.title,
            href: urlModule.resolve(url, ele.attribs.href)
          });
        });
        cb(res, err, data);
      });
  }
};

module.exports = CrawlerService;
