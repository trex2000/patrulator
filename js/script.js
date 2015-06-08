// Mixing jQuery and Node.js code in the same file? Yes please!
$(function(){

	/* RS232 communication */
		var serialPortMain = require("serialport");
		serialPortMain.list(function (err, ports) {
		  ports.forEach(function(port) {
				$('#serialport-list').append($('<li>').text('Found: [' + port.comName + ' : ' + port.manufacturer + ']'));
				if (port.manufacturer === 'Cypress') {
					$('#serialport-list').append($('<li>').text('Serialport found @ ' + port.comName));
					var SerialPort = serialPortMain.SerialPort
					var serialPort = new SerialPort(port.comName, {
					  baudrate: 9600
					}, false); // this is the openImmediately flag [default is true]
					serialPort.open(function (error) {
					  if ( error ) {
							$('#serialport-list').append($('<li>').text('failed to open: '+error));
					  } else {
							$('#serialport-list').append($('<li>').text('opened...'));
					    serialPort.on('data', function(data) {
								$('#serialport-list').append($('<li>').text('data received: ' + data));
								if (typeof mySocket !== 'undefined' && mySocket.connected) {
									io.emit('chat message', 'data received: [' + data + '] : ' + new Date($.now()));
								}
					    });
					  }
					});
				}
		  });
		});

		/* Socket.io communication */
	var app = require('http').createServer()
	var io = require('socket.io')(app);
  var mySocket;

	app.listen(3000);

	io.set('origins', 'patrulator.ro:*');
	io.on('connection', function(socket){
		mySocket = socket;
		$('#socketio-list').append($('<li>').text('CONNECTED'));
		socket.on('chat message', function(msg){
			$('#socketio-list').append($('<li>').text(msg));
			io.emit('chat message', 'Echo ' + msg);
			console.log(io);
		});
	});
});
