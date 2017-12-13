var MD5=require("./MD5.js");

var ICiBaForWord = "^IcibaEnjoyrenmin$";
var queryWord="hello china";
var authKey = MD5(queryWord.trim() +ICiBaForWord);
var url = "http://api.iciba.com/renminribao/search.php?word="+queryWord+"&authkey="+authKey;

var request = require("request");

var options = { method: 'GET',
  url: url,
 
  headers: 
   { 'Postman-Token': '7cb29b50-aa53-724d-2a3f-79f935d1b0b7',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/json' },
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


