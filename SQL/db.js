var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "Aristeia21",
  database: "chat",
  multipleStatements: true
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

// dbConnection.query('insert into messages (message) values ("HI")', function(err, rows){
//     console.log(err);
//     console.log(rows);
//   });



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
  
  var headers = defaultCorsHeaders;
 

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
      var msg = parsedData['text'];
      var user = parsedData.username;
      var room = parsedData.roomname;

      // var queryStr = 'insert into messages (message) values("' + msg + '");' +
      //   'insert into users (user_name) values("' + user + '");' +
      //   'insert into rooms (room_name) values("' + room + '")';
        
      var queryStr = 'select'+ user + 'from users'
      dbConnection.query(queryStr, function(err, rows){
        // if(err)
        for(var i = 0; i < rows.length; i ++){
          if(user = rows[i].user_name){
            dbConnection.query(newQuery, function(err, rows))
          }
        };
        // console.log(msg);
        // console.log(user);
        // console.log(room);
      });

      responseMsg.results.unshift(parsedData);
      response.writeHead(statusCode, headers);
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