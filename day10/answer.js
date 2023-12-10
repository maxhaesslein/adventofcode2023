
function prepareInput( input ) {

	input = input.split("\n");

	var map = input.map(function(el){
		return el.split('');
	});

	var startX, startY;
	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var tile = map[y][x];

			if( tile == 'S' ) {
				startX = x;
				startY = y;
				break;
			}
		}
	}

	return {
		'map': map,
		'start': [startX, startY, 'S']
	};
}


function answer1( input ) {

	var map = input.map,
		previousTile = input.start,
		currentTile = findAdjacentTile( map, previousTile ),
		nextTile,
		count = 0;

	while( true ) {

		var nextTile = getNextTile( currentTile, previousTile );

		if( ! nextTile ) break;

		nextTile[2] = map[nextTile[1]][nextTile[0]];

		previousTile = currentTile;
		currentTile = nextTile;

		count++;
	}

	count = Math.ceil(count/2);

	return count;
}

function findAdjacentTile( map, currentTile ) {

	var x = currentTile[0],
		y = currentTile[1];

	var nextX, nextY, nextType;

	if( ! nextX && y > 0 ){
		// check top
		var topTile = map[y-1][x];
		if( topTile == 'S' || topTile == '|' || topTile == '7' || topTile == 'F' ) {
			nextX = x;
			nextY = y-1;
			nextType = topTile;
		}
	}

	if( ! nextX && x < map[y].length-1 ) {
		// check right
		var rightTile = map[y][x+1];
		if( topTile == 'S' || rightTile == '-' || rightTile == 'J' || rightTile == '7' ) {
			nextX = x+1;
			nextY = y;
			nextType = rightTile;
		}
	}

	if( ! nextX && y < map.length-1 ) {
		// check bottom
		var bottomTile = map[y+1][x];
		if( topTile == 'S' || bottomTile == '|' || bottomTile == 'L' || bottomTile == 'J' ) {
			nextX = x;
			nextY = y+1;
			nextType = bottomTile;
		}
	}

	if( ! nextX && x > 0 ) {
		// check left
		var leftTile = map[y][x-1];
		if( topTile == 'S' || leftTile == '-' || leftTile == 'L' || leftTile == 'F' ) {
			nextX = x-1;
			nextY = y;
			nextType = leftTile;
		}
	}

	if( ! nextX || ! nextY || ! nextType ) {
		console.warn('stayed on current tile!');
		return false;
	}

	return [nextX, nextY, nextType];
}

function getNextTile( currentTile, previousTile ) {

	var type = currentTile[2],
		nextTile = [currentTile[0], currentTile[1]];

	if( type == '|' ) {
		// next tile is top/bottom
		if( previousTile[1] > currentTile[1] ) {
			nextTile[1]--;
		} else {
			nextTile[1]++;
		}
	} else if( type == '-' ) {
		// next tile is left/right
		if( previousTile[0] > currentTile[0] ) {
			nextTile[0]--;
		} else {
			nextTile[0]++;
		}
	} else if( type == 'L' ) {
		// next tile is top/right
		if( previousTile[0] > currentTile[0] ) {
			nextTile[1]--;
		} else {
			nextTile[0]++;
		}
	} else if( type == 'J' ) {
		// next tile is top/left
		if( previousTile[0] < currentTile[0] ) {
			nextTile[1]--;
		} else {
			nextTile[0]--;
		}
	} else if( type == '7' ) {
		// next tile is bottom/left
		if( previousTile[0] < currentTile[0] ) {
			nextTile[1]++;
		} else {
			nextTile[0]--;
		}
	} else if( type == 'F' ) {
		// next tile is bottom/right
		if( previousTile[0] > currentTile[0] ) {
			nextTile[1]++;
		} else {
			nextTile[0]++;
		}
	} else if( type == 'S' ) {
		// back to the start
		return false;
	} else {
		console.warn('type is unknown', currentTile);
		return false;
	}

	return nextTile;
}


function answer2( input ) {
	
	var map = input.map,
		previousTile = input.start,
		currentTile = findAdjacentTile( map, previousTile ),
		nextTile,
		cleanMap = new Array(map.length).fill('.');

	cleanMap = cleanMap.map(function(){
		return new Array(map[0].length).fill('.');
	});

	while( true ) {

		cleanMap[currentTile[1]][currentTile[0]] = currentTile[2];

		var nextTile = getNextTile( currentTile, previousTile );

		if( ! nextTile ) break;

		nextTile[2] = map[nextTile[1]][nextTile[0]];

		previousTile = currentTile;
		currentTile = nextTile;
	}

	// replace S with correct tile:
	var newTileType = getStartTileType( cleanMap, input.start );
	cleanMap[input.start[1]][input.start[0]] = newTileType;
	
	var insideCount = 0;

	for( var y = 0; y < cleanMap.length; y++ ) {
		for( var x = 0; x < cleanMap[y].length; x++ ) {
			var check = isInside( cleanMap, [x, y] );
			if( check ) {
				insideCount++;
				cleanMap[y][x] = 'I';
			}
		}
	}

	drawMap(cleanMap);

	return insideCount;
}

function isInside( map, point ) {

	// asked ChatGPT how to handle this, ChatGPT said to use a Ray Casting algorithm

	if( map[point[1]][point[0]] != '.' ) return false;

	var crossCount = 0,
		y = point[1];

	for( var x = point[0]; x < map[y].length; x++ ) {

		var tile = map[y][x];

		if( tile == '.' || tile == '-' ) continue;
		if( tile == 'F' || tile == '7' ) continue;

		crossCount++;
	}

	var inside = false;
	if( crossCount%2 == 1 ) inside = true;

	return inside;
}

function getStartTileType( map, startTile ) {

	var x = startTile[0],
		y = startTile[1];

	var top = false,
		right = false,
		bottom = false,
		left = false;

	if( y > 0 ){
		var topTile = map[y-1][x];
		if( topTile == '|' || topTile == '7' || topTile == 'F' ) {
			top = true;
		}
	}

	if( x < map[y].length-1 ) {
		var rightTile = map[y][x+1];
		if( rightTile == '-' || rightTile == 'J' || rightTile == '7' ) {
			right = true;
		}
	}

	if( y < map.length-1 ) {
		var bottomTile = map[y+1][x];
		if( bottomTile == '|' || bottomTile == 'L' || bottomTile == 'J' ) {
			bottom = true;
		}
	}

	if( x > 0 ) {
		var leftTile = map[y][x-1];
		if( leftTile == '-' || leftTile == 'L' || leftTile == 'F' ) {
			left = true;
		}
	}

	if( top && bottom ) {
		return '|';
	} else if( top && right ) {
		return 'L';
	} else if( right && bottom ) {
		return 'F';
	} else if( left && bottom ) {
		return '7';
	} else if( top && left ) {
		return 'J';
	} else if( left && right ) {
		return '-';
	} else {
		console.warn('no start tile type found');
		return false;
	}
}

function drawMap( map ) {
	var html = map.map(function(l){return l.join('');}).join("\n");
	html = html.replaceAll('.', '<span style="opacity: 0.3">▉</span>');
	html = html.replaceAll('S', '<span style="color: red">S</span>');
	html = html.replaceAll('I', '▉');
	html = html.replaceAll('|', '│');
	html = html.replaceAll('-', '─');
	html = html.replaceAll('L', '└');
	html = html.replaceAll('J', '┘');
	html = html.replaceAll('7', '┐');
	html = html.replaceAll('F', '┌');

	document.getElementById('testoutput').innerHTML = html;
}
