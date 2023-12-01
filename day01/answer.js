
function prepareInput( input ) {

	input = input.split("\n");

	return input;
}

function answer1( input ) {

	input = prepareInput(input);

	var answer = 0;

	for( var line of input ) {

		var numbers = line.replace(/\D/g, "");

		var firstDigit = numbers.charAt(0),
			lastDigit = numbers.charAt(numbers.length-1);

		var number = parseInt(firstDigit+""+lastDigit, 10);

		answer += number;
	}

	return answer;
}

function answer2( input ) {

	input = prepareInput(input);

	var answer = 0;

	var numbers = {
		'1': 1,
		'one': 1,
		'2': 2,
		'two': 2,
		'3': 3,
		'three': 3,
		'4': 4,
		'four': 4,
		'5': 5,
		'five': 5,
		'6': 6,
		'six': 6,
		'7': 7,
		'seven': 7,
		'8': 8,
		'eight': 8,
		'9': 9,
		'nine': 9
	};

	for( var line of input ) {

		var firstDigit,
			lastDigit,
			firstDigitPos = line.length +1,
			lastDigitPos = -1;

		Object.keys(numbers).forEach( function(item){

			var position = line.indexOf(item);

			if( position !== -1 && position < firstDigitPos ) {
				firstDigitPos = position;
				firstDigit = numbers[item];
			}

			position = line.lastIndexOf(item);

			if( position !== -1 && position > lastDigitPos ) {
				lastDigitPos = position;
				lastDigit = numbers[item];
			}

		});

		var number = parseInt(firstDigit+""+lastDigit, 10);

		answer += number;

	}

	return answer;
}
