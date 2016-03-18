function updateSavedGames() {
	Storage.get('games').then(games => {
		if (games) {
			var list = $('#saved-games').empty();
			for (let game of games)
				list.append($(ce('li')).html(game));
		}
	});
}
onload = function() {
	var tcpServer = chrome.sockets.tcpServer;
	var tcpSocket = chrome.sockets.tcp;
	var udpSocket = chrome.sockets.udp;
	
	var viewStart = $('#view-start');
	updateSavedGames();
};
