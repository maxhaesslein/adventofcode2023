
function prepareInput( input ) {

	input = input.split("\n\n");

	var seeds = input[0].split(':')[1].trim().split(' ');
	var seed2soil = input[1].split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');});
	var soil2fertilizer = input[2].split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');});
	var fertilizer2water = input[3].split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');});
	var water2light = input[4].split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');});
	var light2temperature = input[5].split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');});
	var temperature2humidity = input[6].split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');});
	var humidity2location = input[7].split(':\n')[1].trim().split("\n").map(function(i){return i.trim().split(' ');});
	
	var almanac = {
		'seeds': seeds,
		'seed2soil': seed2soil,
		'soil2fertilizer': soil2fertilizer,
		'fertilizer2water': fertilizer2water,
		'water2light': water2light,
		'light2temperature': light2temperature,
		'temperature2humidity': temperature2humidity,
		'humidity2location': humidity2location
	};

	return almanac;
}

function map( map, input ) {

	for( var range of map ) {

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

function getLocation( seed, almanac ) {

	seed = parseInt(seed, 10);
	
	var soil = map(almanac['seed2soil'], seed ),
		fertilizer = map(almanac['soil2fertilizer'], soil),
		water = map(almanac['fertilizer2water'], fertilizer),
		light = map(almanac['water2light'], water),
		temperature = map(almanac['light2temperature'], light),
		humidity = map(almanac['temperature2humidity'], temperature),
		location = map(almanac['humidity2location'], humidity);

	return location;
}

function answer1( almanac ) {

	var closestLocation = Infinity;

	for( var seed of almanac['seeds'] ) {
		var location = getLocation( seed, almanac );
		if( location < closestLocation ) closestLocation = location;
	}

	return closestLocation;
}

function answer2( almanac ) {
	return '?';
}
