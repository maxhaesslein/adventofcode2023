
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){return l.trim().split('');});

	return input;
}

function getExpand( space ) {

	// find rows to expand
	var rows2expand = [];
	for( var y = 0; y < space.length; y++ ) {
		var emptyOnly = true;
		for( var x = 0; x < space[y].length; x++ ) {
			var el = space[y][x];
			if( el != '.' ) {
				emptyOnly = false;
				break;
			}
		}
		if( emptyOnly ) rows2expand.push(y);
	}

	// find columns to expand
	var columns2expand = [];
	for( var x = 0; x < space[0].length; x++ ) {
		var emptyOnly = true;
		for( var y = 0; y < space.length; y++ ) {
			var el = space[y][x];
			if( el != '.' ) {
				emptyOnly = false;
				break;
			}
		}
		if( emptyOnly ) columns2expand.push(x);
	}

	return {
		rows2expand: rows2expand,
		columns2expand: columns2expand
	};
}

function findGalaxies( space, expandCount ) {

	var galaxies = [];

	var expand = getExpand(space);

	for( var y = 0; y < space.length; y++ ) {
		for( var x = 0; x < space[y].length; x++ ) {
			if( space[y][x] != '#' ) continue;

			var galaxyX = x,
				galaxyY = y;

			for( var row of expand['rows2expand'] ) {
				if( row > y ) break;
				galaxyY += expandCount;
			}

			for( var column of expand['columns2expand'] ) {
				if( column > x ) break;
				galaxyX += expandCount;
			}

			galaxies.push([galaxyX,galaxyY]);
		}
	}

	return galaxies;
}

function manhattanDistance( a, b ) {

	var distance = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

	return distance;
}

function getPathLength( space, expandCount ) {

	if( expandCount ) {
		expandCount -= 1; // read the instructions! d'oh!
	} else {
		expandCount = 1;
	}

	var galaxies = findGalaxies(space, expandCount),
		pathLength = 0;

	while( galaxies.length ){

		galaxy = galaxies.pop();

		for( var targetGalaxy of galaxies ) {
			pathLength += manhattanDistance( galaxy, targetGalaxy );
		}
	}

	return pathLength;
}

function answer1( space ) {
	return getPathLength( space );
}

function answer2( space ) {
	return getPathLength( space, 1000000 );
}
