var HTTP_NEWLINE = '\r\n';
class HttpServer {
	constructor(port) {
		this._port = port;
	}
	get port() {
		return this._port;
	}
	start() {
		var self = this;
		chrome.sockets.tcpServer.create({name:'PCJeopardy host'}, socket => {
			self.socket = info;
			chrome.socket.listen(info.socketId, "0.0.0.0", 0, 10, function(e){
				chrome.socket.getInfo(s.socketId, function(e){
					console.log("Local web server's URL => http://localhost:"+e.localPort+"/"); // you can check listen port :)
				});
				var accept_ = function(sid){
					chrome.socket.accept(sid, function(e){
						rtw(e.socketId);
						accept_(s.socketId);
					});
				}
				accept_(s.socketId);
			});
		})
	}
	set enabled(flag) {
		
	}
}