// Mixing jQuery and Node.js code in the same file? Yes please!
$(function(){

	//var serialPort = require("serialport");
	
	var app = require('http').createServer()
	var io = require('socket.io')(app);

	app.listen(3000);
	
	io.set('origins', 'patrulator.ro:*');
	io.on('connection', function(socket){
		$('#socketio-list').append($('<li>').text('CONNECTED'));
		socket.on('chat message', function(msg){
			$('#socketio-list').append($('<li>').text(msg));
			io.emit('chat message', 'Echo ' + msg);
		});
	});
});