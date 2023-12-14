
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


function numberOfArrangements( record, position, safetyInformation, group, length, sum ) {

	if( position >= record.length ) {
		if( group < safetyInformation.length || length > 0 ) {
			return 0;
		}

		return 1;
	}

	var symbol = record[position];

	position++;

	if( symbol == '.' ) {

		// skip ahead, if there are more dots
		while( position < record.length ) {
			if( record[position] != '.' ) break;
			position++;
		}
		return numberOfArrangements( record, position, safetyInformation, group, length, 0 );

	} else if( symbol == '#' ) {

		length++;

		if( length == safetyInformation[group] ) {

			// check next symbol:
			if( position >= record.length ) {
				// end of string

				if( length != safetyInformation[group] ) {
					return 0;
				}

			} else if( record[position] == '#' ) {
				return 0;
			} else if( record[position] == '?' ) {
				record = record.slice(0,position)+'.'+record.slice(position+1);
			}

			group++;
			length = 0;

		} else if( group > safetyInformation.length || length > safetyInformation[group] ) {
			return 0;
		} else if( record[position] == '.' ) {
			return 0;
		}

		return numberOfArrangements( record, position, safetyInformation, group, length, 0 );

	} else if( symbol == '?' ) {

		if( length == 0 || safetyInformation[group] == length ) { // check, if current group is already closed (or no group is open), otherwise we don't need to check for .
			record = record.slice(0,position-1)+'.'+record.slice(position);
			sum += numberOfArrangements( record, position-1, safetyInformation, group, length, 0 );
		}

		record = record.slice(0,position-1)+'#'+record.slice(position);
		sum += numberOfArrangements( record, position-1, safetyInformation, group, length, 0 );

	}

	return sum;
}

function answer1( springs ) {

	var sum = 0;

	for( var spring of springs ) {
		sum += numberOfArrangements( spring['conditionRecord'], 0, spring['safetyInformation'], 0, 0, 0 );
	}

	return sum;
}

function answer2( springs ) {

	for( var i = 0; i < springs.length; i++ ) {
		var spring = springs[i];

		springs[i] = {
			'conditionRecord': spring['conditionRecord']+'?'+spring['conditionRecord']+'?'+spring['conditionRecord']+'?'+spring['conditionRecord']+'?'+spring['conditionRecord'],
			'safetyInformation': spring['safetyInformation'].concat(spring['safetyInformation'], spring['safetyInformation'], spring['safetyInformation'], spring['safetyInformation'])
		};
	}

	return answer1( springs );
}
