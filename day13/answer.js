
function prepareInput( input ) {

	input = input.split("\n\n");

	input = input.map(function(pattern) {
		return pattern.split("\n");
	});

	var patterns = [];

	for( var rows of input ) {

		var columns = [];
		for( var row of rows ) {
			for( var i = 0; i < row.length; i++ ) {
				var el = row[i]
				if( ! columns[i] ) columns[i] = '';
				columns[i] += el;
			}
		}

		patterns.push({
			'rows': rows,
			'columns': columns
		});
	}

	return patterns;
}

function getMirroredLine( lines, expectedErrorCount ) {

	if( ! expectedErrorCount ) expectedErrorCount = 0;

	var possibleStartLines = [];
	for( var y = 0; y < lines.length-1; y++ ) {

		var line1 = lines[y],
			line2 = lines[y+1];

		var difference = countDifference(line1, line2);

		if( difference > expectedErrorCount ) continue;

		possibleStartLines.push(y);
	}

	for( var possibleStartLine of possibleStartLines ) {
		var mirrored = true,
			count = 1,
			errorCount = 0;

		for( var y = possibleStartLine; y >= 0; y-- ) {

			var mirroredY = y+count;

			var line1 = lines[y],
				line2 = lines[mirroredY];

			if( ! line2 ) break;

			var difference = countDifference(line1, line2);

			errorCount += difference;

			if( difference > expectedErrorCount || errorCount > expectedErrorCount ) {
				mirrored = false;
				break;
			}

			count += 2;
		}

		if( errorCount < expectedErrorCount ) mirrored = false;

		if( mirrored ) {
			return possibleStartLine;
		}

	}

	return false;
}

function countDifference( line1, line2 ) {
	var count = 0;

	for( var i = 0; i < line1.length; i++ ) {
		if( line1[i] != line2[i] ) count++;
	}

	return count;
}

function answer1( patterns ) {

	var sum = 0;

	for( var pattern of patterns ) {

		var mirroredColumn = getMirroredLine(pattern['columns']);
		if( mirroredColumn !== false ) {
			sum += mirroredColumn+1;
		}

		var mirroredRow = getMirroredLine(pattern['rows']);
		if( mirroredRow !== false ) {
			sum += (mirroredRow+1)*100;
		}

	}

	return sum;
}

function answer2( patterns ) {
	
	var sum = 0;

	for( var pattern of patterns ) {

		var mirroredColumn = getMirroredLine(pattern['columns'], 1);
		if( mirroredColumn !== false ) {
			sum += mirroredColumn+1;
		}

		var mirroredRow = getMirroredLine(pattern['rows'], 1);
		if( mirroredRow !== false ) {
			sum += (mirroredRow+1)*100;
		}

	}

	return sum;
}
