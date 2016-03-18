function showStartScreen() {
	Storage.get('games').then(games => {
		var gameList = $('#saved-games').empty();
		if (games)
			for (let game of games)
				gameList.append($(ce('li')).html(game).click(loadGame.bind(game)));
		$('.view-active:not(#view-start)').removeClass('view-active');
		View.transitionTo('start');
	});
}
function createGame() {
	View.transitionTo('create-game-0');
}
function loadGame(game) {
	View.transitionTo('load-game');
}
onload = function() {
	var tcpServer = chrome.sockets.tcpServer;
	var tcpSocket = chrome.sockets.tcp;
	var udpSocket = chrome.sockets.udp;
	
	$('#view-start .view-footer').click(createGame);
	showStartScreen();
};
