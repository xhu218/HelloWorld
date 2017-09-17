var net = require('net');

var HOST = '127.0.0.1';
var PORT = 4001;

var client = new net.Socket();




client.connect(PORT, HOST, function() {

    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    sendmsg();
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client    

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {

    console.log('DATA: ' + data);
    // Close the client socket completely
    //client.destroy();

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});


function sendmsg() {
    setInterval(function() {
        try {
            client.write('I am Chuck Norris!');
        } catch (err) {
            console.log(err);
            client.connect(PORT, HOST, function() {
                console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client    
            });
        }
    }, 3000);
    client.write('I am Chuck Norris!');
}

sendmsg();