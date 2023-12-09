
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map( function(element){
		return element.split(' ').map(function(el){
			return parseInt(el, 10);
		});
	});

	return input;
}

function getNextValue( inputValues ) {

	var history = [ inputValues ];

	var h = 0;
	// walk down
	while( true ) {
		
		var values = history[h];

		var historyValues = [],
			allZero = true;

		for( var i = 1; i < values.length; i++ ) {
			var prevValue = values[i-1],
				curValue = values[i];

			var dif = curValue-prevValue;

			if( dif !== 0 ) allZero = false;

			historyValues.push(dif);
		}

		history.push(historyValues);

		if( allZero ) break;

		h++;
	}

	// walk up
	for( var i = history.length-1; i > 0; i-- ) {
		var prevLastValue = history[i-1][history[i-1].length-1],
			curLastValue = history[i][history[i].length-1];
		history[i-1][history[i-1].length] = prevLastValue+curLastValue;
	}

	return history[0][history[0].length-1];
}

function answer1( input ) {

	var sum = 0;

	for( var values of input ) {
		var nextValue = getNextValue(values);
		sum += nextValue;
	}

	return sum;
}

function answer2( input ) {

	var reverseInput = input.map(function(values){
		return values.reverse();
	});

	return answer1(reverseInput);
}
