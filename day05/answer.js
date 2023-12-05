
function prepareInput( input ) {

	input = input.split("\n\n");

	var seeds = input.shift().split(':')[1].trim().split(' ');

	var transforms = [];
	for( var transform of input ) {
		transform = transform.split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');})
		transforms.push(transform);
	}

	var almanac = {
		'seeds': seeds,
		'transforms': transforms,
	};

	return almanac;
}

function map_one( transform, input ) {

	for( var range of transform ) {

		var destinationStart = parseInt(range[0], 10),
			sourceStart = parseInt(range[1], 10),
			rangeLength = parseInt(range[2], 10);

		if( input < sourceStart ) continue;
		if( input > sourceStart+rangeLength ) continue;

		var dif = input-sourceStart;

		return destinationStart+dif;
	}

	return input;
}

function answer1( almanac ) {

	var closestLocation = Infinity;

	for( var seed of almanac['seeds'] ) {
		step = parseInt(seed, 10);

		for( var transform of almanac['transforms'] ) {
			step = map_one(transform, step);
		}

		if( step < closestLocation ) closestLocation = step;
	}

	return closestLocation;
}

function map_range( transform, input ) {

	var restList = input;

	var answerList = [];

	for( var range of transform ) {

		var destinationStart = parseInt(range[0], 10),
			sourceStart = parseInt(range[1], 10),
			rangeLength = parseInt(range[2], 10);

		sourceEnd = sourceStart+rangeLength;

		var testAgainList = [];

		while( restList.length ){

			var currentRange = restList.pop(),
				currentRangeStart = currentRange[0],
				currentRangeEnd = currentRange[1];

			var before = [currentRangeStart, Math.min(currentRangeEnd, sourceStart)],
				middle = [Math.max(currentRangeStart, sourceStart), Math.min(sourceEnd, currentRangeEnd)],
				after = [Math.max(sourceEnd, currentRangeStart), currentRangeEnd];

			if( before[1] > before[0] ) {
				testAgainList.push(before);
			}
			if( middle[1] > middle[0] ) {
				answerList.push( [ middle[0]-sourceStart+destinationStart, middle[1]-sourceStart+destinationStart ] );
			}
			if( after[1] > after[0] ) {
				testAgainList.push(after);
			}

		}

		restList = testAgainList;

	}

	return answerList.concat(restList);
}

function answer2( almanac ) {

	var closestLocations = [];

	var seeds = almanac['seeds'];
	for( var i = 0; i < seeds.length; i++ ) {

		var seedStart = parseInt(seeds[i], 10),
			seedLength = parseInt(seeds[++i], 10);

		var range = [[seedStart,seedStart+seedLength]];

		for( var transform of almanac['transforms'] ) {
			range = map_range(transform, range);
		}

		var closestLocation = Infinity;
		for( var currentRange of range ) {
			if( currentRange[0] < closestLocation ) closestLocation = currentRange[0];
		}

		closestLocations.push( closestLocation );

	}

	closestLocations.sort(function(a,b){return a-b;});

	return closestLocations[0];
}
