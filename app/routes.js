import {getUsers} from './controllers/userController.js';
import {addTransaction, completeTransactions} from './controllers/transactionController.js';
import {calculateDebts} from './controllers/debtController.js';
var bodyParser = require('body-parser');

module.exports = function(app, connection) {

  app.get('/api/v1/getAllUsers', function(req, res){
    var rows = getUsers(req, res, connection);
    
  });

  app.get('/api/v1/getSimplifiedDebts', function(req, res){
    calculateDebts(req, res, connection);
  });


  app.post('/api/v1/addTransaction', function(req, res){
    var body = req.body;
    var rows = addTransaction(body, res, connection);
    
  });

  app.post('/api/v1/completeTransactions', function(req, res){
    var body = req.body;
    var rows = completeTransactions(body, res, connection);
    
  });
};
