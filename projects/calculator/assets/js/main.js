/* global textFit */

function resizeText() {
	const calcLines = document.querySelectorAll('#screen div');
	for (const line of calcLines) {
		textFit(line, {
			alignVert: true,
		});
	}
}

addEventListener('load', resizeText);
addEventListener('resize', resizeText);
