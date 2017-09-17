var net = require('net');
var server = net.createServer();
var sockets = [];
server.on('connection', function(socket) {

    console.log('got a new connection');
    sockets.push(socket);
    console.log('sockets length:', sockets.length);


    socket.on('data', function(data) {
        console.log('got data:', data.toString());
        sockets.forEach(function(otherSocket) {
            if (otherSocket == socket) {
                otherSocket.write(data);
                otherSocket.destroy();
            }
        });
    });

	socket.on('error', function(err) {
	    console.log('Server error:', err.message);
	});

    socket.on('close', function() {
        console.log('connection closed');
        var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
        console.log('sockets length:', sockets.length);
    });


});


server.on('error', function(err) {
    console.log('Server error:', err.message);
});


server.on('close', function() {
    console.log('Server closed');
});


server.listen(4001);