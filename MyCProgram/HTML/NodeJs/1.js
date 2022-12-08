var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://www.baidu.com',
  'headers': {
    'Cookie': 'BAIDUID=90621D6FAE0868CF5DB966E85276AC27:FG=1; BIDUPSID=90621D6FAE0868CFF5CF693BB602E78B; H_PS_PSSID=31253_34812_35915_36166_34584_35979_36055_36234_26350_36301_22157_36447; PSTM=1652944814; BDSVRTM=17; BD_HOME=1'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
