require('async');
var bodyParser = require('body-parser');
var transaction = require("../services/transactionService.js");

async function addTransaction(req, res, connection){

  return await transaction.add(req, res, connection);

}

module.exports =  {
  addTransaction : addTransaction
};