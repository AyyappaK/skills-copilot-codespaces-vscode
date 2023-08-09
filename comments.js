// create web server with nodejs
// node comments.js
// open browser and go to http://localhost:3000
// refresh browser to see new comments
// type ctrl-c in terminal to stop server

var http = require('http'); // require http module
var fs = require('fs'); // require filesystem module
var url = require('url'); // require url module

var comments = []; // array to hold comments

var server = http.createServer(function(req, res) { // create server
  var url_parts = url.parse(req.url); // parse url
  console.log(url_parts);
  if(url_parts.pathname == '/') { // if url is root
    fs.readFile('./comments.html', function(err, data) { // read file
      res.end(data); // send file contents to browser
    });
  }
  else if(url_parts.pathname == '/comments') { // if url is comments
    if(req.method == 'POST') { // if request is POST
      var body = '';
      req.on('data', function (data) { // on data received
        body += data; // append data
        console.log('Partial body: ' + body);
      });
      req.on('end', function () { // on data complete
        console.log('Body: ' + body);
        comments.push(body); // push data to array
        res.end('ok'); // send ok to browser
      });
    }
    else if(req.method == 'GET') { // if request is GET
      var commentString = '';
      for(var i = 0; i < comments.length; i++) { // loop through comments
        commentString += comments[i] + '<br>'; // append each comment
      }
      res.end(commentString); // send comments to browser
    }
  }
  else { // if url is not root or comments
    res.writeHead(404); // write 404
    res.end('Page not found'); // send page not found to browser
  }
});

server.listen(3000); // listen on port 3000
console.log('Server running on port 3000'); // log to console