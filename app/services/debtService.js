require('async');
const request = require('request-promise')

function calculate(req, res, con)
{
  con.query('SELECT * FROM userIDs', async (err,rows) => {
  if(err) throw err;

  var userIndex = {};
  var indexUser = {};

  for(var j = 0; j < rows.length; j++)
  {
    userIndex[rows[j].id.toString()] = j;
    indexUser[j.toString()] = rows[j].id.toString();
  }

  con.query('SELECT * FROM transaction', async (err, transactionRows) => {
    if(err) throw err;

    var graph = new Array(rows.length);
    for (var i = 0; i < rows.length; i++) 
    {
      graph[i] = new Array(rows.length);
    }

    for(var i = 0; i < graph.length; i++)
    {
      for(var j = 0; j < graph[0].length; j++)
      {
        graph[i][j] = 0;
      }
    }

    for(var i = 0; i < transactionRows.length; i++)
    {
      graph[userIndex[transactionRows[i].idfrom.toString()]][userIndex[transactionRows[i].idto.toString()]] = transactionRows[i].amount;
    }

    

    var result = minimumCashFlow(graph);
    console.log("here");
    if(typeof(result.transaction) === 'undefined')
    {
      res.send({transaction : []});
    }
    else
    {
      for(var i = 0; i < result.transaction.length; i++)
      {
        result.transaction[i].to = indexUser[result.transaction[i].to.toString()];
        result.transaction[i].from = indexUser[result.transaction[i].from.toString()];
      }

      res.send(result, 200);
    }
    
  })

  

  console.log(userIndex);
}).catch(err)
  {
  	console.log(err);
  };
}

function minimumCashFlow(graph){

  var amount = getAmount(graph);
  console.log(amount);
  var result = getMinimumTransactions(amount);

  return result;

}

function getAmount(graph)
{
  var amount = new Array(graph.length);

  for (var i = 0; i < amount.length; i++) 
  {
    amount[i] = 0;
  }
  for (var i = 0; i < graph.length; i++) 
  {
    for (var j = 0; j < graph.length; j++) 
    {
      amount[i] += graph[j][i] - graph[i][j];
    }
  }

  return amount;

}

function getMinimumTransactions(amount)
{

  var result = { transaction : []};

  var sum = 1;
  
  while( sum != 0)
  {
    var maximumCreditPerson = getMaxPerson(amount);
    var maximumDebitPerson = getMinPerson(amount);

    if (amount[maximumCreditPerson] === 0 && amount[maximumDebitPerson] === 0) 
    {
        return {};
    }

    var min = Math.min(-amount[maximumDebitPerson], amount[maximumCreditPerson]);

    amount[maximumCreditPerson] -= min;
    amount[maximumDebitPerson] += min;

    var currentTransaction = { "from" :maximumCreditPerson , "to" : maximumDebitPerson, "amount" : min};

    console.log(currentTransaction);

    result.transaction.push(currentTransaction);

    maximumCreditPerson = getMaxPerson(amount);
    maximumDebitPerson = getMinPerson(amount);

    sum = maximumCreditPerson + maximumDebitPerson;
  }
  

  return result;

}

function getMaxPerson(amount) 
{
  var maxPerson = 0;
    for (var i = 1; i < amount.length; i++) 
    {
      if (amount[i] > amount[maxPerson]) 
      {
        maxPerson = i;
      }
    }
    return maxPerson;
}

function getMinPerson(amount) 
{
  var minPerson = 0;
    for (var i = 1; i < amount.length; i++) 
    {
      if (amount[i] < amount[minPerson]) 
      {
        minPerson = i;
      }
    }
    return minPerson;
}


module.exports =  {
  "calculate" : calculate
};