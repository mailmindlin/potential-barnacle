var currentGame;
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
		currentGame = {};
		$('#view-create-game-0 input').focus();
	});
	
	$('#view-create-game-0 input').on('keypress', e => {
		var key = e.keyCode || e.which;
		if (key == 9) { 
			e.preventDefault(); 
			$('#view-create-game-0 button').focus();
		} 
	});
	
	$('#view-create-game-0 button').click(() => {
		var name = $('#view-create-game-0 input').val();
		if (name == '')
			return;
		currentGame.name = name;
		View.transitionTo('create-categories');
		$('#view-create-categories input:first-of-type').val('').focus();
	});
	
	$('#view-create-categories .button-continue').click(e => {
		currentGame.categories = [];
		var table = $('#view-create-values table');
		var thead = table.find('thead tr').empty();
		var tbody = table.find('tbody').empty();
		for (var category of $('#category-inputs').children()) {
			var name = $(category).val();
			console.log(name);
			currentGame.categories.push(name);
			thead.append($('<th>').html(name));
		}
		for (var i = 1; i <= 5; i++) {
			var row = $('<tr>');
			for (var j of currentGame.categories)
				row.append($('<td>').html(i + '00'));
			tbody.append(row);
		}
		View.transitionTo('create-values');
	});
	showStartScreen();
};
