
function prepareInput( input ) {

	input = input.split("\n");

	return input;
}


function answer1( input ) {

	var bag = {
		'red': 12,
		'green': 13,
		'blue': 14,
	};

	var possibleSum = 0;

	var gameNumber = 0;
	for( var game of input ) {
		gameNumber++;

		game = game.split(':');
		game = game[1].trim();
		game = game.split(';');

		var impossible = false;

		round:
		for( var round of game ) {
			round = round.trim().split(',');
			for( var hand of round ) {
				hand = hand.trim().split(' ');
				var number = parseInt(hand[0], 10),
					color = hand[1];
				
				if( number > bag[color] ) {
					impossible = true;
					break round;
				}
			}
		}

		if( ! impossible ) possibleSum += gameNumber;

	}

	return possibleSum;
}


function answer2( input ) {

	var powerSum = 0;

	var gameNumber = 0;
	for( var game of input ) {
		gameNumber++;

		game = game.split(':');
		game = game[1].trim();
		game = game.split(';');

		var currentMinimumBag = {
			'red': -1,
			'green': -1,
			'blue': -1
		}

		for( var round of game ) {
			round = round.trim().split(',');
			for( var hand of round ) {
				hand = hand.trim().split(' ');
				var number = parseInt(hand[0], 10),
					color = hand[1];
				
				if( currentMinimumBag[color] < number ) {
					currentMinimumBag[color] = number;
				}
				
			}
		}

		var power = currentMinimumBag['red']*currentMinimumBag['green']*currentMinimumBag['blue'];

		powerSum += power;

	}

	return powerSum;
}
