 require('date-utils');

 var dt = new Date().addDays(-1);
 var filename = dt.toFormat("YYYY-MM-DD");
 console.log(filename);