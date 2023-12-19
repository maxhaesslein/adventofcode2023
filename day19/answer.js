
function prepareInput( input ) {

	input = input.split("\n\n");

	var workflowsInput = input[0],
		partsInput = input[1];

	workflowsInput = workflowsInput.split('\n');

	var workflows = {};
	for( var l of workflowsInput ) {
		var l = l.split('{');
		var name = l[0],
			flow = l[1].replace('}','').split(',');

		workflows[name] = flow;
	}

	var parts = partsInput.split('\n').map(function(part){
		part = part.replace('{','').replace('}','').split(',');
		var p = {};
		for( var cat of part ) {
			cat = cat.split('=');
			p[cat[0]] = parseInt(cat[1],10);
		}
		return p;
	});

	return {
		workflows: workflows,
		parts: parts,
	};
}

function checkPart( part, workflow ) {

	for( check of workflow ) {
		check = check.split(':');
		if( check.length == 1 ) {
			return check[0];
		}
		var target = check[1];
		check = check[0].split('');

		var cat = check.shift(),
			cond = check.shift(),
			test = parseInt(check.join(''),10);

		if( cond == '<' ) {
			if( part[cat] < test ) {
				return target;
			}
		} else if( cond == '>' ) {
			if( part[cat] > test ) {
				return target;
			}
		} else {
			console.warn('unknown condition', cond);
			return false;
		}
	}

	console.warn('reached end of workflow, no target aquired!');
	return false;

}

function answer1( input ) {

	var sum = 0;

	var parts = input.parts,
		workflows = input.workflows;

	for( var part of parts ) {
		var wf = 'in';

		while( wf ) {

			if( wf == 'A' ) {
				sum += part.x+part.m+part.a+part.s;
				break;
			} else if( wf == 'R' ) {
				break;
			}

			wf = checkPart( part, workflows[wf] );
		}

	}

	return sum;
}

function answer2( input ) {
	return '?';
}
