// create web server
// execute node comments.js
// localhost:3000

var http = require('http');
var url = require('url');
var fs = require('fs');

var comments = [];
http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.readFile('./views/index.html', function(err, data) {
      if (err) {
        return res.end('404 Not Found');
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      });
      res.end(htmlStr);
    });
