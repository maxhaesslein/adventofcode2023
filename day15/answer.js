
function prepareInput( input ) {

	input = input.trim().split(",");

	return input;
}

function answer1( input ) {

	var sum = 0;

	for( var characters of input ) {
		sum += hash(characters);
	}

	return sum;
}

function hash( string ) {

	var currentValue = 0;

	for( var i = 0; i < string.length; i++ ) {
		var asciiCode = string.charCodeAt(i);

		currentValue += asciiCode;
		currentValue *= 17;
		currentValue %= 256;
	}

	return currentValue;
}

function answer2( input ) {
	
	var boxes = new Array(256);

	for( var step of input ) {

		var stepEquals = step.split('='),
			stepDash = step.split('-'),
			label = false;

		var operation = false;
		if( stepEquals.length > 1 && stepEquals[1] ) {
			label = stepEquals[0];
			operation = '=';
			var focalLength = parseInt(stepEquals[1], 10);
		}
		if( stepDash.length > 1 ) {
			label = stepDash[0];
			operation = '-';
		}

		var boxNumber = hash(label);

		if( ! boxes[boxNumber] ) boxes[boxNumber] = [];

		if( operation == '=' ) {

			var lens = {
				'label': label,
				'focalLength': focalLength
			};

			var lensIndex = findLens( boxes[boxNumber], label );
			if( lensIndex > -1 ) {
				boxes[boxNumber][lensIndex] = lens;
			} else {
				boxes[boxNumber].push(lens);
			}

		} else if( operation == '-' ) {

			var lensIndex = findLens( boxes[boxNumber], label );
			if( lensIndex > -1 ) {
				boxes[boxNumber].splice( lensIndex, 1 );
			}

		}
	}

	return getFocusingPower(boxes);
}

function findLens( box, lensLabel ) {

	for( var i = 0; i < box.length; i++ ) {
		if( box[i].label == lensLabel ) {
			return i;
		}
	}

	return -1;
}

function getFocusingPower( boxes ) {
	var focusingPower = 0;

	for( var i = 0; i < boxes.length; i++ ) {
		var box = boxes[i];
		var boxNumber = 1+i;

		if( ! box ) continue;
		if( ! box.length ) continue;

		for( var j = 0; j < box.length; j++ ) {
			var focalLength = box[j].focalLength;
			var slotNumber = j+1;

			focusingPower += boxNumber*slotNumber*focalLength;
		}
	}

	return focusingPower;
}
