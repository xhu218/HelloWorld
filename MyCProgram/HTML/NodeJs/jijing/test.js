 require('date-utils');

 var dt = new Date().addHours(-24);
 var filename = dt.toFormat("YYYY-MM-DD");
 console.log(filename);