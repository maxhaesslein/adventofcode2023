
function prepareInput( input ) {

	input = input.split("\n");

	var sets = input.map(function(el){

		el = el.split(' ');

		var cards = el[0].split('');
		var bid = parseInt(el[1],10);

		return {
			cards: cards,
			bid: bid
		};
	});

	return sets;
}


function sortSets( a, b ) {

	if( a['type'] > b['type'] ) {
		return 1;
	} else if( b['type'] > a['type'] ) {
		return -1;
	} else {
		// type is the same, sort by value
		// this is uglyyyyy, I know :)
		
		if( a['cards'][0] > b['cards'][0] ) {
			return 1;
		} else if( b['cards'][0] > a['cards'][0] ) {
			return -1;

		} else if( a['cards'][1] > b['cards'][1] ) {
			return 1;
		} else if( b['cards'][1] > a['cards'][1] ) {
			return -1;

		} else if( a['cards'][2] > b['cards'][2] ) {
			return 1;
		} else if( b['cards'][2] > a['cards'][2] ) {
			return -1;

		} else if( a['cards'][3] > b['cards'][3] ) {
			return 1;
		} else if( b['cards'][3] > a['cards'][3] ) {
			return -1;

		} else if( a['cards'][4] > b['cards'][4] ) {
			return 1;
		} else if( b['cards'][4] > a['cards'][4] ) {
			return -1;
		}

		console.warn('keeping order, this should not happen');
		return 0; // keep order
	}

	console.warn('keeping order, this should not happen');
	return 0; // keep order
}

function getTotalWinnings( sets ) {

	sets.sort(sortSets);

	var totalWinnings = 0,
		rank = 1;
	for( var set of sets ) {
		totalWinnings += rank*set['bid'];
		rank++;
	}

	return totalWinnings;
}


function getType( cards ) {

	var count = [];
	for( var card of cards ) {
		if( count[""+card] === undefined ) count[""+card] = 0;
		count[""+card]++;
	}

	var countSorting = Object.keys(count).sort(function(a,b){return count[b]-count[a]});

	var highestCardCount = count[countSorting[0]],
		secondHighestCardCount = count[countSorting[1]],
		type;

	if( highestCardCount == 5 ) {
		type = 6; // five of a kind
	} else if( highestCardCount == 4 ) {
		type = 5; // four of a kind
	} else if( highestCardCount == 3 && secondHighestCardCount == 2 ) {
		type = 4; // full house
	} else if( highestCardCount == 3 ) {
		type = 3; // three of a kind
	} else if( highestCardCount == 2 && secondHighestCardCount == 2 ) {
		type = 2; // two of a kind
	} else if( highestCardCount == 2 ) {
		type = 1; // one pair
	} else {
		type = 0; // high card
	}

	return type;
}

function answer1( sets ) {

	for( var i = 0; i < sets.length; i++ ) {

		sets[i]['cards'] = sets[i]['cards'].map(function(card){

			if( card == 'A' ) {
				card = 14;
			} else if( card == 'K' ) {
				card = 13;
			} else if( card == 'Q') {
				card = 12;
			} else if( card == 'J' ) {
				card = 11;
			} else if( card == 'T' ) {
				card = 10;
			} else {
				card = parseInt(card, 10);
			}

			return card;
		});

		sets[i].type = getType(sets[i].cards);
	}

	return getTotalWinnings(sets);
}


function getTypeWithJoker( cards ) {

	var count = [],
		jokerCount = 0;
	for( var card of cards ) {
		if( card === 0 ) {
			jokerCount++;
			continue; // don't add jokers to count
		}
		if( count[""+card] === undefined ) count[""+card] = 0;
		count[""+card]++;
	}

	var countSorting = Object.keys(count).sort(function(a,b){return count[b]-count[a]});

	var highestCardCount = count[countSorting[0]],
		secondHighestCardCount = count[countSorting[1]],
		type;

	if( highestCardCount+jokerCount == 5 || jokerCount == 5 ) {
		type = 6; // five of a kind
	} else if( highestCardCount+jokerCount == 4 ) {
		type = 5; // four of a kind
	} else if( highestCardCount+jokerCount == 3 && secondHighestCardCount == 2 ) {
		type = 4; // full house
	} else if( highestCardCount+jokerCount == 3 ) {
		type = 3; // three of a kind
	} else if( highestCardCount+jokerCount == 2 && secondHighestCardCount == 2 ) {
		type = 2; // two of a kind
	} else if( highestCardCount+jokerCount == 2 ) {
		type = 1; // one pair
	} else {
		type = 0; // high card
	}

	return type;
}

function answer2( sets ) {

	for( var i = 0; i < sets.length; i++ ) {

		sets[i]['cards'] = sets[i]['cards'].map(function(card){

			if( card == 'J' ) { // J is now a joker
				card = 0;
			} else if( card == 'A' ) {
				card = 14;
			} else if( card == 'K' ) {
				card = 13;
			} else if( card == 'Q') {
				card = 12;
			} else if( card == 'T' ) {
				card = 10;
			} else {
				card = parseInt(card, 10);
			}

			return card;
		});

		sets[i].type = getTypeWithJoker(sets[i].cards);
	}

	return getTotalWinnings(sets);
}
