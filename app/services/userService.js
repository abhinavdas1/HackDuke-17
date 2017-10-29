require('async');
const request = require('request-promise')

function getAll(req, res, con)
{
  con.query('SELECT * FROM userIDs', async (err,rows) => {
  if(err) throw err;

  var info = await getDetails();

  var users = [];

  for (var i = 0; i < info.results.length; i++)
  {
  	for(var j = 0; j < rows.length; j++)
  	{
  		if(info.results[i]._id === rows[j].id)
  		{
  			users.push(info.results[i]);
  		}	
  	}
  	
  }

  var result = {"users" : users};

  res.send(result, 200);

  console.log(users);
}).catch(err)
  {
  	console.log(err);
  };
}

function getDetails(){

  const options = {
    method: 'GET',
    uri: 'http://api.reimaginebanking.com/enterprise/customers',
    qs:{
      'key' : "9b38bc6f9e4a9d118bd55081f6ee4425"
    },
    json: true
  }

  return request( options );

}


module.exports =  {
  "getAll" : getAll
};