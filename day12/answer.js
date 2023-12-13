
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

function numberOfArrangements( record, safetyInformation ) {

	var sum = 0;

	for( var i = 0; i < record.length; i++ ) {

		if( record[i] == '.' || record[i] == '#' ) {
			continue;
		} else if( record[i] == '?' ) {

			var dot = record.slice(0,i)+'.'+record.slice(i+1);
			var hash = record.slice(0,i)+'#'+record.slice(i+1);

			sum += numberOfArrangements( dot, safetyInformation );
			sum += numberOfArrangements( hash, safetyInformation );

			return sum;

		}

	}

	if( validArrangement( record, safetyInformation ) ) {
		sum += 1;
	}

	return sum;
}

function validArrangement( arrangement, safetyInformation ) {

	arrangement = arrangement.split('.');
	arrangement = arrangement.filter(i=>i); // remove empty elements

	if( arrangement.length != safetyInformation.length ) return false;

	for( var i = 0; i < arrangement.length; i++ ) {
		if( arrangement[i].length != safetyInformation[i] ) return false;
	}

	return true;
}

function answer1( springs ) {

	var sum = 0;

	for( var spring of springs ) {
		sum += numberOfArrangements( spring['conditionRecord'], spring['safetyInformation'] );
	}

	return sum;
}

function answer2( springs ) {
	return '?';
}
