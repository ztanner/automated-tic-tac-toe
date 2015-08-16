var Game = function() {
	this.player1 = player1;
	this.player2 = player2;
	if( Math.floor(Math.random() * 10) % 2 == 0) {
		this.currentPlayer = this.player1;
	} else {
		this.currentPlayer = this.player2;
	}
	this.board = [[null, null, null], [null, null, null], [null,null,null]];
	this.winner = null;

}

Game.prototype.fetchEmpty = function() {
	var emptySpots = []
	for(var i=0;i<3;i++) {
		for (var j=0; j<3; j++) {
			if(!this.board[i][j])
				emptySpots.push([i,j])
		}
	}
	return emptySpots;
}
Game.prototype.readSpace = function(coords) {
	return this.board[coords[0]][coords[1]];
}
Game.prototype.checkEmpty = function(coords) {
	if(!this.board[coords[0]][coords[1]])
		return true;
}
Game.prototype.getPlayerCoords = function(player){
	var playerCoords = []
	for(var i=0;i<3;i++) {
		for (var j=0; j<3; j++) {
			if(this.board[i][j] == player.symbol) {
				playerCoords.push([i,j])
			}
		}
	}
	return playerCoords;
}
Game.prototype.checkWinner = function(coords) {
	var winner = null;
	var line;
	var first_space;
	var x = coords[0];
	var y = coords[1];
	//x,0 ; x, 1; x, 2

	if(this.board[x][0] === this.board[x][1] && this.board[x][0] === this.board[x][2] && this.board[x][0]) {
		winner = this.board[x][0];
	}

	//0,y; 1,y; 2,y
	else if(this.board[0][y] === this.board[1][y] && this.board[0][y] === this.board[2][y] && this.board[2][y]) {
		winner = this.board[0][y];
	}

	//0,0; 1,1; 2,2;
	else if(x === y && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2] && this.board[0][0]) {
		winner = this.board[0][0];
	}

	//0,2; 1,1; 2,0
	else if((x === y && x === 1) || Math.abs(x - y) === 2) {
		if( this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0] && this.board[0][2]) {
			winner = this.board[0][2];
		}
	}
	if(!winner && this.fetchEmpty().length === 0) {
		return "DRAW";
	}
	return winner;
}
Game.prototype.printBoard = function() {
	for (var i=0;i<3;i++) {
		console.log( ( this.board[i][0] ? this.board[i][0].symbol : '?' ) + " | " + ( this.board[i][1] ? this.board[i][1].symbol  : '?' ) + " | " 
			+ (this.board[i][2] ? this.board[i][2].symbol : '?') )
		document.getElementById('board').innerHTML += ( this.board[i][0] ? this.board[i][0].symbol : '?' ) + " | " + ( this.board[i][1] ? this.board[i][1].symbol  : '?' ) + " | " 
			+ (this.board[i][2] ? this.board[i][2].symbol : '?') + "<br />";
	}
	document.getElementById('board').innerHTML += "<br />";
}
Game.prototype.announceWinner = function(winner) {
	if(winner && winner != "DRAW") {
		winner.wins += 1;
		console.log(winner.symbol + " HAS WON");
		document.getElementById('board').innerHTML += "<p><strong>"+winner.symbol + " HAS WON:</strong></p>";
	} else if (winner == "DRAW") {
		console.log("DRAW");
		document.getElementById('board').innerHTML += "<p><strong>DRAW:</strong></p>";
	}
	this.winner = winner;
	this.printBoard();
}
Game.prototype.placeTac = function(coords, player) {
	if(this.checkEmpty(coords))
		this.board[coords[0]][coords[1]] = this.currentPlayer;
	if(this.currentPlayer == this.player1) {
		this.currentPlayer = this.player2;
	}
	else {
		this.currentPlayer = this.player1;
	}
	if(this.checkWinner(coords)) {
		this.announceWinner(this.checkWinner(coords));
	}
}