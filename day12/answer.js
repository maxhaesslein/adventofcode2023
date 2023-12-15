var cache;


function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		l = l.split(' ');

		return {
			'conditionRecord': l[0],
			'safetyInformation': l[1].split(',').map(function(e){return parseInt(e, 10);})
		};
	});

	return input;
}


function numberOfArrangements( record, safetyInformation, sum ) {

	var cacheHash = record+safetyInformation.join(',');
	if( cache[cacheHash] ) {
		return cache[cacheHash];
	}

	if( record.length < 1 ) {
		if( safetyInformation.length < 1 ) {
			cache[cacheHash] = 1;
			return 1;
		} else {
			cache[cacheHash] = 0;
			return 0;
		}
	}

	var symbol = record[0];

	if( symbol == '.' ) {

		// skip ahead, if there are more dots
		for( var i = 0; i < record.length; i++ ) {
			if( record[i] != '.' ) break;
		}
		record = record.substring(i);
		sum = numberOfArrangements( record, safetyInformation, sum );

	} else if( symbol == '#' ) {

		if( safetyInformation.length < 1 ) {
			cache[cacheHash] = 0;
			return 0;
		}

		var expectedLength = safetyInformation[0];

		for( var i = 0; i < expectedLength; i++ ) {

			if( ! record[i] ) {
				cache[cacheHash] = 0;
				return 0;
			} else if( record[i] == '.' ) {
				cache[cacheHash] = 0;
				return 0;
			} else if( record[i] == '?' ) {
				record = record.slice(0,i)+'#'+record.slice(i+1);
			}

		}

		record = record.substring(i);
		safetyInformation.shift(); // remove the group we just traversed

		if( record.length > 0 ) {

			if( record[0] == '#' ) {
				cache[cacheHash] = 0;
				return 0;
			} else if( record[0] == '?' ) {
				record = record.slice(1); // remove the first element, because it _must_ be a dot, and so we can ignore it
			}

		}

		// check, if remaining groups fit
		var minLength = -1;
		for( var i = 0; i < safetyInformation.length; i++ ) {
			minLength += safetyInformation[i]+1;
		}
		if( minLength > record.length ) {
			cache[cacheHash] = 0;
			return 0;
		}

		sum = numberOfArrangements( record, safetyInformation, sum );

	} else if( symbol == '?' ) {

		sum += numberOfArrangements( '#'+record.slice(1), Array.from(safetyInformation), 0 );
		sum += numberOfArrangements( record.slice(1), Array.from(safetyInformation), 0 ); // first element is a dot, so we can just remove and ignore it

	}

	cache[cacheHash] = sum;
	return sum;
}

function answer1( springs ) {

	var sum = 0;

	for( var spring of springs ) {
		cache = {};
		sum += numberOfArrangements( spring['conditionRecord'], spring['safetyInformation'], 0 );
	}

	return sum;
}

function answer2( springs ) {

	for( var i = 0; i < springs.length; i++ ) {

		cache = {};

		var spring = springs[i];

		springs[i] = {
			'conditionRecord': spring['conditionRecord']+'?'+spring['conditionRecord']+'?'+spring['conditionRecord']+'?'+spring['conditionRecord']+'?'+spring['conditionRecord'],
			'safetyInformation': spring['safetyInformation'].concat(spring['safetyInformation'], spring['safetyInformation'], spring['safetyInformation'], spring['safetyInformation'])
		};
	}

	return answer1( springs );
}
