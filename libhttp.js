var HTTP_NEWLINE = '\r\n';
var tcpServer = chrome.sockets.tcpServer;
var tcpSocket = chrome.sockets.tcp;
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
		var id = socket.clientSocketId;
		tcpSocket.setPaused(id, false);
		if (id != this.socket.socketId) {
			console.error('Invalid socket id ' + id + ' (expected ' + this.socket.socketId + ')');
			return;
		}
		console.info('ACCEPT', socket);
	}
	_read(socket) {
		console.info('READ', socket);
		
	}
	set paused(flag) {
		return doPromise(tcpServer.setPaused, tcpServer, flag);
	}
}