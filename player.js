var Player = function(symbol) {
	this.symbol = symbol;
	this.wins = 0;
}
Player.prototype.chooseSpace = function(game) {
	var options = game.fetchEmpty();
	return options[Math.floor(Math.random() * options.length)];
}
Player.prototype.move = function(game) {
	if(game.fetchEmpty())
		game.placeTac(this.chooseSpace(game),this);
}
