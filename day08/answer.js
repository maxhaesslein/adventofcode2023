
function prepareInput( input ) {

	input = input.split("\n\n");

	var instructions = input[0].trim().split(''),
		map = {};

	for( var el of input[1].trim().split("\n") ) {
		el = el.trim().split(' = ');

		var key = el[0].trim(),
			value = el[1].trim().replace('(','').replace(')','').split(', ');

		map[key] = value;
	}

	return {
		instructions: instructions,
		map: map
	};
}

function answer1( input ) {

	var count = 0,
		instructions = input.instructions,
		map = input.map,
		key = 'AAA';
	do {

		var instruction = instructions[count%instructions.length];
		
		if( instruction == 'L' ) {
			key = map[key][0];
		} else if( instruction == 'R' ) {
			key = map[key][1];
		}

		count++;

	} while( key !== 'ZZZ' );

	return count;
}

function answer2( input ) {

	var instructions = input.instructions,
		map = input.map,
		cycles = [];

	for( var key of Object.keys(map) ) {
		if( key[2] !== 'A' ) continue;
		
		var count = 0,
			instructions = input.instructions,
			map = input.map;
		do {

			var instruction = instructions[count%instructions.length];
			
			if( instruction == 'L' ) {
				key = map[key][0];
			} else if( instruction == 'R' ) {
				key = map[key][1];
			}

			count++;

		} while( key[2] !== 'Z' );

		cycles.push(count);

	}
	
	return lcm(cycles);
}


// used https://iq.opengenus.org/lcm-of-array-of-numbers/
function lcm( arr ) {
	
	var ans = arr[0];

	for( var i = 1; i < arr.length; i++ ) {
		ans = (((arr[i]* ans)) / (gcd(arr[i], ans)));
	}

	return ans;
}

function gcd( a, b ) {
	if( b == 0 ) {
		return a;
	}

	return gcd( b, a%b );
}
