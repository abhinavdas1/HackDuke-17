
//  setup
require('babel-core/register');
require("babel-polyfill");
var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var router = require('./app/routes');
var jwt = require('jwt-simple');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(express.static('./webApp'));
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');


// application -------------------------------------------------------------

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "columbas",
  database : "sys"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

require('./app/routes.js')(app, con);

app.get('*', function(req, res) {
    res.sendfile(__dirname + '/webApp/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 3000);
console.log("App listening on port 3000");
