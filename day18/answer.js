
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		l = l.split(' ');
		l[1] = parseInt(l[1], 10);
		l[2] = l[2].replace('(','').replace(')','');
		return l;
	});

	return input;
}

function answer1( input ) {

	// after browsing the subreddit, I found out about the shoelace formula / Gauss's area formula
	// For a polygon with n vertices (x1, y1), (x2, y2), ..., (xn, yn), the formula is:
	// Area = 1/2 * Σ(xi*yi+1 - xi+1*yi) 

	var area = 0;

	var x1 = 0,
		y1 = 0;

	for( var line of input ) {

		var direction = line[0],
			distance = line[1];

		var x2 = x1,
			y2 = y1;

		if( direction == 'U' ) {
			y2 -= distance;
		} else if( direction == 'D' ) {
			y2 += distance;
		} else if( direction == 'L' ) {
			x2 -= distance;
		} else if ( direction == 'R' ) {
			x2 += distance;
		}

		area += x1*y2 - x2*y1;

		x1 = x2;
		y1 = y2;

		area += distance; // add the area for the actual line

	}

	area /= 2;
	area = Math.abs(area);
	area += 1; // the area for the starting point

	return area;
}

function answer2( input ) {

	input = decodeInput(input);

	return answer1(input);
}

function decodeInput( input ) {

	var decodedInput = [];

	for( var el of input ) {
		var color = el[2],
			distance = parseInt(color.slice(1,6), 16),
			direction = color.slice(6);

		if( direction == 0 ) {
			direction = 'R';
		} else if( direction == 1 ) {
			direction = 'D';
		} else if( direction == 2 ) {
			direction = 'L';
		} else if( direction == 3 ) {
			direction = 'U';
		} else {
			console.warn('unknown direction', direction)
		}

		decodedInput.push([direction, distance, color]);
	}

	return decodedInput;
}
