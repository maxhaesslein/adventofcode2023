
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		l = l.split(' ');
		l[2] = l[2].replace('(','').replace(')','');
		return l;
	});

	return input;
}

function answer1( input ) {

	var map = build(input);

	map = fill(map);

	draw(map);

	return holeCount(map);
}

function answer2( input ) {
	return "?";
}

function build( input ) {

	var map = [],
		x = 0,
		y = 0;

	for( var line of input ) {
		var direction = line[0],
			distance = parseInt(line[1],10),
			color = line[2];

		if( ! map[y] ) map[y] = [];

		if( direction == 'U' || direction == 'D' ) {

			var startY, endY;
			if( direction == 'D' ) {
				startY = y+1;
				endY = y+1+distance;
				y += distance;
			} else {
				startY = y-distance;
				endY = y;
				y -= distance;
			}

			for( var yi = startY; yi < endY; yi++ ) {
				if( ! map[yi] ) map[yi] = [];
				map[yi][x] = color;
			}

		} else if( direction == 'L' || direction == 'R' ) {

			var startX, endX;
			if( direction == 'R' ) {
				startX = x+1;
				endX = x+1+distance;
				x += distance;
			} else {
				startX = x-distance;
				endX = x;
				x -= distance;
			}

			for( var xi = startX; xi < endX; xi++ ) {
				map[y][xi] = color;
			}
			
		}

	}

	map = normalize(map);

	return map;
}

function normalize( map ) {

	// our map can have negative indexes, we normalize them here to start at 0

	var newMap = [];

	// JavaScript is weird, but this works :)
	var keys = Object.keys(map).sort(function(a,b){
		return a-b;
	});
	for( var key of keys ) {
		newMap.push(map[key]);
	}

	// find the lowest x value
	var lowestXKey = 0;
	for( var y = 0; y < newMap.length; y++ ){
		var xKeys = Object.keys(newMap[y]).sort(function(a,b){return a-b;});
		var currentLowestXKey = parseInt(xKeys[0],10);
		if( currentLowestXKey < lowestXKey ) lowestXKey = currentLowestXKey;
	}

	// move all lines to the right
	for( var y = 0; y < newMap.length; y++ ) {
		var newLine = [];
		for( var x = lowestXKey; x < newMap[y].length; x++ ) {
			newLine.push(newMap[y][x]);
		}
		newMap[y] = newLine;
	}

	return newMap;
}

function fill(map) {

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var el = map[y][x];
			if( isInside( map, [x,y] ) ) {
				map[y][x] = '#000'; // black for now
			}
		}
	}

	return map;
}

function isInside( map, point ) {

	if( map[point[1]][point[0]] ) return false;

	var crossCount = 0,
		y = point[1];

	for( var x = point[0]; x <= map[y].length; x++ ) {

		var tile = map[y][x];

		if( ! tile ) {
			continue;
		}

		if( map[y+1] && map[y+1][x] ) {
			crossCount++;
		}
		
	}

	var inside = false;
	if( crossCount%2 == 1 ) inside = true;

	return inside;
}

function holeCount( map ) {
	map = map.map(function(l){
		return l.map(function(e){
			if( e ) return '#';
			else return '';
		}).join('');
	}).join('');

	return map.length;
}

function draw( map ) {

	var output = document.getElementById('testoutput');

	var string = '';
	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var color = map[y][x];
			if( ! color ) {
				string += ' ';
				continue;
			}

			string += '<span style="color: '+color+';">■</span>';

		}
		string += '<br>';
	}

	output.innerHTML = string;

}
