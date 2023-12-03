
function prepareInput( input ) {

	input = input.split("\n");

	var map = [];

	for( var line of input ) {
		line = line.split('');
		map.push(line);
	}

	return map;
}


function answer1( map ) {

	var sum = 0;

	for( var y = 0; y < map.length; y++ ) {

		for( var x = 0; x < map[y].length; x++ ) {

			var pointType = getPointType(map,x,y);

			if( pointType != 'number' ) continue;

			var point = map[y][x];

			var number = parseInt(extractNumber(map, x, y), 10);

			var isNextToSymbol = false;

			for( var xS = 0; xS < (number+"").length; xS++ ) {

				var left = getPointType(map,x-1,y),
					right = getPointType(map,x+1,y),
					top = getPointType(map,x,y-1),
					bottom = getPointType(map,x,y+1),
					leftTop = getPointType(map,x-1,y-1),
					rightTop = getPointType(map,x+1,y-1),
					leftBottom = getPointType(map,x-1,y+1),
					rightBottom = getPointType(map,x+1,y+1);

				if( left == 'symbol' || right == 'symbol' || top == 'symbol' || bottom == 'symbol' ||
					leftTop == 'symbol' || rightTop == 'symbol' || leftBottom == 'symbol' || rightBottom == 'symbol' ) {

					isNextToSymbol = true;
				}

				x++;
			}

			if( isNextToSymbol ) {
				sum += number;
			}

		}

	}

	return sum;
}


function answer2( map ) {

	var sum = 0;

	for( var y = 0; y < map.length; y++ ) {

		for( var x = 0; x < map[y].length; x++ ) {

			var pointType = getPointType(map,x,y);

			if( pointType != 'symbol' ) continue;

			var symbol = map[y][x];

			if( symbol != '*' ) continue;

			var numbers = [];

			for( var cy = -1; cy <= 1; cy++ ) {
				for( var cx = -1; cx <= 1; cx++ ) {

					var ctype = getPointType(map, x+cx, y+cy);

					if( ctype != 'number' ) continue;

					cnumber = parseInt(extractNumber(map, x+cx, y+cy), 10);

					if( numbers.indexOf(cnumber) === -1 ) {
						numbers.push(cnumber);
					}

				}
			}

			if( numbers.length === 2) {
				sum += numbers[0]*numbers[1];
			}

		}

	}

	return sum;
}


function getPointType( map, x, y ) {

	if( x < 0 || y < 0 ) return false;
	if( y >= map.length || x >= map[y].length) return false;

	var point = map[y][x];

	if( point == '.' ) return false;
	if( isNaN(parseInt(point, 10)) ) return 'symbol';

	return 'number';
}

function extractNumber( map, x, y, check ) {

	if( x < 0 || y < 0 ) return false;
	if( y >= map.length || x >= map[y].length ) return false;

	var point = map[y][x];

	if( point == '.' ) return false;

	if( isNaN(parseInt(point, 10)) ) return false;

	var number = point;

	if( check === undefined || check == 'left' ) {
		var leftNumber = extractNumber(map, x-1, y, 'left');
		if( leftNumber ) number = leftNumber+""+number;
	}

	if( check === undefined || check == 'right' ) {
		var rightNumber = extractNumber(map, x+1, y, 'right');
		if( rightNumber ) number = number+""+rightNumber;
	}

	return number;
}
