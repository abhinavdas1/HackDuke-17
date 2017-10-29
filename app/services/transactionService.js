require('async');
const request = require('request-promise')

function add(req, res, con)
{
  con.query('Insert into transaction VALUES (\'' + req.from + '\',\'' + req.to  + '\',' + req.amount + ')', async (err,rows) => {
  if(err) throw err;

  res.send("Transaction has been recorded", 200);

  console.log("inserted");
}).catch(err)
  {
  	console.log(err);
  };
}


module.exports =  {
  "add" : add
};