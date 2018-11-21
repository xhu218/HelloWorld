
module.exports = function (input, func) {  
    var remaining = '';  
    input.on('data', function(data) {    
        remaining += data;    
        var index = remaining.indexOf('\r\n');    
        while (index > -1) {      
            var line = remaining.substring(0, index);      
            remaining = remaining.substring(index + 1);            
            func(line,"mid");      

            index = remaining.indexOf('\r\n');    
        }   
    });   
    input.on('end', function() {    
        if (remaining.length >= 0) {      

            func(remaining,"end");    
        }

    });
} 
