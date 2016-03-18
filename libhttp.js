var HTTP_NEWLINE = '\r\n';
var tcpServer = chrome.sockets.tcpServer;
var tcpSocket = chrome.sockets.tcp;
var stringToUint8Array = function(string) {
	var buffer = new ArrayBuffer(string.length);
		var view = new Uint8Array(buffer);
		for (var i = 0; i < string.length; i++)
			view[i] = string.charCodeAt(i);
	return view;
};

var arrayBufferToString = function(buffer) {
	var str = '';
	var uArrayVal = new Uint8Array(buffer);
	for (var s = 0; s < uArrayVal.length; s++)
		str += String.fromCharCode(uArrayVal[s]);
	return str;
};

class HttpServer {
	constructor(port) {
		this._port = port;
	}
	get port() {
		return this._port;
	}
	start() {
		var self = this;
		return new Promise((yay, nay) => {
			tcpServer.create({name:'PcJeopardy host'}, socket => {
				self.socket = socket;
				tcpServer.listen(socket.socketId, '0.0.0.0', self.port, 50, result => {
					if (result < 0) {
						console.error('Error listening @ 0.0.0.0:' + self.port, result);
						nay(result);
					} else {
						console.info('LISTEN', '0.0.0.0:' + self.port);
						tcpServer.onAccept.addListener(self._accept.bind(self));
						tcpSocket.onReceive.addListener(self._read.bind(self));
						yay(result);
					}
				});
			});
		});
	}
	_accept(socket) {
		tcpSocket.setPaused(socket.clientSocketId, false);
		if (socket.socketId != this.socket.socketId) {
			console.error('Invalid socket id ' + socket.socketId + ' (expected ' + this.socket.socketId + ')');
			return;
		}
		console.info('ACCEPT', socket);
	}
	_read(socket) {
		console.info('READ', socket);
		var data = arrayBufferToString(socket.data);
		console.log(data);
	}
	set paused(flag) {
		return doPromise(tcpServer.setPaused, tcpServer, flag);
	}
}