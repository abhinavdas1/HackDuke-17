require('async');
var bodyParser = require('body-parser');
var debts = require("../services/debtService.js");

async function calculateDebts(req, res, connection){

  return await debts.calculate(req, res, connection);

}

module.exports =  {
  calculateDebts : calculateDebts
};