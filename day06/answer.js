
function prepareInput( input ) {

	input = input.split("\n");

	// NOTE: filter(i=>i) removes empty entries from the array
	var times = input[0].replace('Time: ','').split(' ').filter(i=>i).map(function(i){return parseInt(i, 10);});
	var distances = input[1].replace('Distance: ','').trim().split(' ').filter(i=>i).map(function(i){return parseInt(i, 10);});

	var races = [];

	for( var i = 0; i < times.length; i++ ) {
		var time = times[i],
			distance = distances[i];

		races.push({
			time: time,
			distance: distance
		});

	}

	return races;
}


function getNumberOfBetterTimes( time, distance ) {

	var testDistance;

	var lowestPossibleTime = -1;
	do{
		lowestPossibleTime++;
		testDistance = getDistance( lowestPossibleTime, time );
	} while( testDistance <= distance );


	var highestPossibleTime = time+1;
	do {
		highestPossibleTime--;
		testDistance = getDistance( highestPossibleTime, time );
	} while( testDistance <= distance );


	return highestPossibleTime+1-lowestPossibleTime;
}

function getDistance( testTime, time ) {

	var speed = testTime;

	time -= testTime;

	var distance = time * speed;

	return distance;
}


function answer1( input ) {

	var numbers = 1;

	for( var race of input ) {
		numbers *= getNumberOfBetterTimes(race.time, race.distance);
	}

	return numbers;
}

function answer2( input ) {

	var time = "",
		distance = "";

	for( var race of input ) {
		time += ""+race.time;
		distance += ""+race.distance;
	}

	time = parseInt(time, 10);
	distance = parseInt(distance, 10);

	return getNumberOfBetterTimes( time, distance );
}
