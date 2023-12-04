
function prepareInput( input ) {

	input = input.split("\n");

	cards = [];

	for( var line of input ) {

		line = line.split(':');
		line = line[1].trim().split('|');

		var card = {
			// NOTE: .filter(i=>i) removes empty entries from the array
			winning: line[0].trim().split(' ').filter(i=>i),
			own: line[1].trim().split(' ').filter(i=>i)
		};

		cards.push(card);

	}

	return cards;
}

function answer1( cards ) {

	var points = 0;

	for( var card of cards ) {

		var winningNumberPoints = 0;
		for( var ownNumber of card['own'] ) {
			if( card['winning'].indexOf(ownNumber) !== -1 ) {
				if( winningNumberPoints > 0 ) {
					winningNumberPoints *= 2;
				} else {
					winningNumberPoints = 1;
				}
			}
		}
		points += winningNumberPoints;

	}

	return points;
}

function answer2( cards ) {
	
	// prepare cards
	for( var i = 0; i < cards.length; i++ ) {

		var card = cards[i],
			winningNumberCount = 0;

		for( var ownNumber of card['own'] ) {
			if( card['winning'].indexOf(ownNumber) !== -1 ) {
				winningNumberCount++;
			}
		}

		cards[i]['winningNumberCount'] = winningNumberCount;
		cards[i]['copies'] = 1;

	}

	// make copies
	for( var i = 0; i < cards.length; i++ ) {
		var card = cards[i];
		for( var j = 0; j < card['winningNumberCount']; j++ ) {
			cards[i+j+1]['copies'] += card['copies'];
		}
	}

	// count
	var sum = 0;
	for( var card of cards ) {
		sum += card['copies'];
	}

	return sum;
}
