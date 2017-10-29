require('async');
var bodyParser = require('body-parser');
var transaction = require("../services/transactionService.js");


async function addTransaction(req, res, connection){

  return await transaction.add(req, res, connection);

}

async function completeTransactions(req, res, connection){

  return await transaction.complete(req, res, connection);

}

async function getTransactions(req, res, connection){

  return await transaction.get(req, res, connection);

}

module.exports =  {
  addTransaction : addTransaction,
  completeTransactions : completeTransactions,
  getTransactions : getTransactions
};