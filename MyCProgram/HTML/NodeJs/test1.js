var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://guba.eastmoney.com/list,of519674_3.html',//http://guba.eastmoney.com/list,of519674.html
  'headers': {
  }
};

//http://91sc.top/jj.html
request(options, function (error, response) { 
  if (error) throw new Error(error);
  //console.log(response.body);
  var content = response.body;
  var res = content.match(/<div class="articleh([\s\S]*?)<\/div>/g);
  //console.log(res)
  if(res!=null){
  	res.forEach(function(item,index){
  		//console.log(item);
  		//读
  		var i = item.match(/<span class="l1">[\s\S].*?<\/span>/g);
  		console.log(i[0].replace(/<[^>]+>/g,""));
  		//写
  		var i = item.match(/<span class="l2">[\s\S].*?<\/span>/g);
  		console.log(i[0].replace(/<[^>]+>/g,""));
  		//作者
  		var i = item.match(/<span class="l3">[\s\S].*?<\/span>/g);
  		console.log(i[0].replace(/<[^>]+>/g,""));
  		//内容
  		var i = item.match(/<span class="l4">[\s\S].*?<\/span>/g);
  		console.log(i[0].replace(/<[^>]+>/g,""));
  		//时间
  		var i = item.match(/<span class="l5">[\s\S].*?<\/span>/g);
  		console.log(i[0].replace(/<[^>]+>/g,""));
		
		console.log("-------------------------------------------------------------")  

  	})
  	
  }


});
