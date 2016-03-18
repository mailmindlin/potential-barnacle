function showStartScreen() {
	Storage.get('games').then(games => {
		var gameList = $('#saved-games').empty();
		if (games)
			for (let game in games)
				gameList.append($(ce('li')).html(game).click(loadGame.bind(game)));
		$('.view-active:not(#view-start)').removeClass('view-active');
		View.transitionTo('start');
	});
}
function createGame() {
	
}
function loadGame(name) {
	Storage.get('games').then(games=> {
		var game = games[name];
		if (!game)
			return;
		View.transitionTo('waiting-client-join');
	});
}
onload = function() {
	var tcpServer = chrome.sockets.tcpServer;
	var tcpSocket = chrome.sockets.tcp;
	var udpSocket = chrome.sockets.udp;
	
	$('#view-start .view-footer').click(() => {
		View.transitionTo('create-game-0');
		$('#view-create-game-0 input').focus();
	});
	
	$('#view-create-game-0 button').click(() => {
		if ($('#view-create-game-0 input').val() == '')
			return;
		View.transitionTo('create-categories');
		$('#view-create-categories input:first-of-type').val('').focus();
	});
	showStartScreen();
};
