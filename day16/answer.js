
// NOTE: directions are: 0: bottom->top / 1: to left->right / 2: top->bottom / 3: right->left

function prepareInput( input ) {

	input = input.split("\n");

	var map = input.map(function(l){
		return l.split('');
	});

	return map;
}

function answer1( map ) {

	var startWalker = {
		x: -1,
		y: 0,
		direction: 1,
	};

	var energy = getEnergy( startWalker, map );

	return energy;
}

function answer2( map ) {

	var maxEnergy = 0;

	for( var direction = 0; direction < 4; direction++ ) {

		if( direction == 0 || direction == 2 ) {

			var y = -1;
			if( direction == 0 ) y = map.length;

			for( var x = 0; x < map[0].length; x++ ) {			

				var startWalker = {
					x: x,
					y: y,
					direction: direction,
				};

				var energy = getEnergy( startWalker, map );

				if( energy > maxEnergy ) maxEnergy = energy;

			}

		} else if( direction == 1 || direction == 3) {

			var x = -1;
			if( direction == 3 ) x = map[0].length;

			for( var y = 0; y < map.length; y++ ) {

				var startWalker = {
					x: x,
					y: y,
					direction: direction,
				};

				var energy = getEnergy( startWalker, map );

				if( energy > maxEnergy ) maxEnergy = energy;

			}

		}

	}

	return maxEnergy;
}

function getEnergy( startWalker, map ) {

	var walkers = [startWalker];

	var energyMap = [],
		walkerCache = [];

	while( walkers.length ) {

		var newWalkers = [];

		for( walker of walkers ) {

			var nextX = walker.x,
				nextY = walker.y,
				direction = walker.direction;

			if( direction == 0 ) {
				nextY--;
			} else if( direction == 1 ) {
				nextX++;
			} else if( direction == 2 ) {
				nextY++;
			} else if( direction == 3 ) {
				nextX--;
			}

			if( nextX < 0 || nextX >= map[0].length || nextY < 0 || nextY >= map.length ) {
				continue;
			}

			var walkerHash = nextX+'x'+nextY+'x'+direction;

			if( walkerCache[walkerHash] ) continue; // already walked this walk

			var nextTile = map[nextY][nextX];

			walker.x = nextX;
			walker.y = nextY;

			if( ! energyMap[nextY] ) energyMap[nextY] = [];
			energyMap[nextY][nextX] = '#';

			if( nextTile == '-' ) {
				if( direction == 0 || direction == 2 ) {
					newWalkers.push({
						x: walker.x,
						y: walker.y,
						direction: 1,
					});
					walker.direction = 3;
				}
			} else if( nextTile == '|' ) {
				if( direction == 1 || direction == 3 ) {
					newWalkers.push({
						x: walker.x,
						y: walker.y,
						direction: 0,
					});
					walker.direction = 2;
				}
			} else if( nextTile == '/' ) {
				if( direction == 0 ) {
					walker.direction = 1;
				} else if( direction == 1 ) {
					walker.direction = 0;
				} else if( direction == 2 ) {
					walker.direction = 3;
				} else if( direction == 3 ) {
					walker.direction = 2;
				}
			} else if( nextTile == '\\' ) {
				if( direction == 0 ) {
					walker.direction = 3;
				} else if( direction == 1 ) {
					walker.direction = 2;
				} else if( direction == 2 ) {
					walker.direction = 1;
				} else if( direction == 3 ) {
					walker.direction = 0;
				}
			}

			walkerCache[walkerHash] = true;

			newWalkers.push(walker);
		}

		walkers = newWalkers;

	}

	return getMapEnergy( energyMap );
}

function getMapEnergy( map ) {

	var energy = 0;

	var string = '';
	for( var y = 0; y < map.length; y++ ) {
		if( ! map[y] ) continue;
		string += map[y].join('');
	}

	return string.length;
}
