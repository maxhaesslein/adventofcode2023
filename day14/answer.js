
function prepareInput( input ) {

	input = input.split("\n");

	var map = input.map(function(l){
		return l.split('');
	});

	return map;
}

function countLoad( map ) {
	var load = 0;

	var weight = map.length;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var el = map[y][x];
			if( el != 'O' ) continue;

			load += weight;
		}

		weight--;

	}

	return load;
}

function moveRocksNorth( map ) {

	var moving = true;

	while( moving ) {
		moving = false;
		for( var y = 1; y < map.length; y++ ) {
			var line = map[y];
			for( var x = 0; x < map[y].length; x++ ) {
				var el = map[y][x];

				if( el != 'O' ) continue;

				if( map[y-1][x] != '.' ) continue;

				moving = true;
				map[y-1][x] = 'O';
				map[y][x] = '.';
			}
		}
	}

	return map;
}

function answer1( map ) {

	map = moveRocksNorth(map);

	return countLoad(map);
}

function answer2( map ) {

	var cycleCount = 1000000000;

	var startTime = performance.now();

	var mapHistory = [];

	for( var i = 0; i < cycleCount; i++ ) {
		map = moveRocksOneCycle(map);

		var flatMap = mapAsString(map);

		var firstDuplicateIndex = mapHistory.indexOf(flatMap);
		if( firstDuplicateIndex !== -1 ) {
			if( mapHistory.indexOf(flatMap, firstDuplicateIndex+1) !== -1 ) {
				// found a cycle, skip ahead
				var period = i - firstDuplicateIndex;
				var skipCycles = Math.floor((cycleCount-i)/period)*period;
				i += skipCycles;
			}
		}

		mapHistory.push(flatMap);
	}

	var count = countLoad(map);

	count += '<br><span style="opacity: 0.5">('+(performance.now()-startTime)+'ms)</span>';

	return count;
}

function moveRocksOneCycle( map ) {

	for( var i = 0; i < 4; i++ ) {
		map = moveRocksNorth(map);
		map = rotateRight(map);
	}

	return map;
}

function rotateRight( map ) {

	var newMap = [];

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var el = map[y][x];

			var newX = map.length-1-y,
				newY = x;

			if( ! newMap[newY] ) newMap[newY] = [];

			newMap[newY][newX] = el;
		}
	}

	return newMap;
}

function mapAsString( map ) {
	var string = "";
	for( var y = 0; y < map.length; y++ ) {
		string += map[y].join('');
	}

	return string;
}
