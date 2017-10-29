require('async');
const request = require('request-promise')

function add(req, res, con)
{
  con.query('Insert into transaction VALUES (\'' + req.from + '\',\'' + req.to  + '\',' + req.amount + ')', async (err,rows) => {
  if(err) throw err;

  res.send({"response" : "Transaction has been recorded"}, 201);

  console.log("inserted");
}).catch(err)
  {
  	console.log(err);
  };
}

async function complete(req, res, con)
{
	var accountNumber = [];

	con.query('SELECT * FROM userIDs', async (err,rows) => { 

		for (var i = 0; i < req.transactions.length; i++)
  		{
  			var bal = await getBalance(req.transactions[i].from);
  			if( bal[0].balance < req.transactions[i].amount)
  			{
  				res.send({"flag" : false, "user" : req.transactions[i].from},400);
  			}
  			accountNumber.push(bal[0].account_number);

  		}
  	
  	for(var i = 0; i < req.transactions.length; i++)
  	{
  		await doDeposits(accountNumber[i], req.transactions[i]);
  	}


  	res.send("Transactions has been made", 201);

  	console.log(accountNumber);

	}).catch(err)
	{
		console.log(err);
	};
  	
	
}

async function getBalance(userId){

  const options = {
    method: 'GET',
    uri: 'http://api.reimaginebanking.com/customers/' + userId.toString() + '/accounts',
    qs:{
      'key' : "9b38bc6f9e4a9d118bd55081f6ee4425"
    },
    json: true
  }

  return  request( options );

}

async function doDeposits(account, transaction){

	console.log(transaction);

  const options = {
    method: 'POST',
    uri: 'http://api.reimaginebanking.com/accounts/' + account + '/transfers/?key=' + '9b38bc6f9e4a9d118bd55081f6ee4425',
    body : {
    	"medium": "balance",
  		"payee_id": transaction.to.toString(),
  		"amount": parseInt(transaction.amount),
  		"transaction_date": "2017-10-29",
  		"description": "Sample"
    },
    json: true
  }

  return  request( options );

}





module.exports =  {
  "add" : add,
  "complete" : complete
};