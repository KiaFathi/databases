var fs = require('fs');
// var pathReq = require('path');
// var urlMod = require('url');

/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

module.exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */
  var method = request.method;
  console.log("type: " + request.type);
  console.log("method: " + request.method);
  var url = request.url;
  console.log(url);
  var uri = request.uri;
  var path = url.split('/') || uri.split('/');

  console.log("path[1]: " + path[1]);


  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  

  // var fileLoc = pathReq.join(process.cwd(), request.url);
  var headers = defaultCorsHeaders;
  // var root = urlMod.parse(request.url).pathname


  // if(request.method === "GET" && root = '/'){
  //   fs.readFile('./client/index.html', function(err, html){
  //     if (err){
  //       throw "Could not read file";
  //     } 
  //     else{
  //       response.writeHeader(200, {"Content-Type": "text/html"});
  //       response.write(html);
  //       response.end();
  //     }
  //   })
  // }

  if ((request.method === "POST") && (path[1] === 'classes')) {
    console.log('Handling POST request...');
    var statusCode = 201;
    headers['Content-Type'] = "application/json";
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function(){
      var parsedData = JSON.parse(data);
      parsedData.createdAt = Date.now();
      responseMsg.results.unshift(parsedData);
      response.writeHead(statusCode, headers);
      fs.appendFile('./../data.json', 'TEST', function(err){
        err ? console.log('ERRORROROROROR') : console.log("Success");
      });
      response.end(JSON.stringify(parsedData));
    });
  } else if (request.method === "GET" && path[1] === 'classes') {
    var statusCode = 200;
    console.log("Handling GET request...");
    headers['Content-Type'] = "application/json";
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(responseMsg));
  } else if (request.method === "OPTIONS") {
    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  } else {
    var statusCode = 404;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end("404 - we have a team of trained monkeys working on the issue. AKA we are trained monkeys.");
  }




  /* .writeHead() tells our server what HTTP status code to send back */

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var results = [];
var responseMsg = {};
responseMsg.results = results;
