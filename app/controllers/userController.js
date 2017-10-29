require('async');
var bodyParser = require('body-parser');
var user = require("../services/userService.js");

async function getUsers(req, res, connection){

  return await user.getAll(req, res, connection);

}

module.exports =  {
  getUsers : getUsers
};