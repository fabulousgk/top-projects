/* global textFit */

const calcStack = [];
let entryMode = false;

function resizeText() {
	const calcLines = document.querySelectorAll('#screen div');
	for (const line of calcLines) {
		textFit(line, {});
	}
}

function updateDisplay() {
	for (let i = 0; i < 8; i++) {
		document.querySelector(`#line${i + 1}`).textContent = calcStack[i];
	}

	if (entryMode) {
		document.querySelector('#line1-indicator').textContent = '1►';
		document.querySelector('#line1-div .textFitted').style.justifyContent =
			'start';
	} else {
		document.querySelector('#line1-indicator').textContent = '1:';
		document.querySelector('#line1-div .textFitted')?.removeAttribute('style');
	}

	resizeText();
}

function input(value) {
	if (entryMode) {
		calcStack[0] += value;
	} else {
		calcStack.unshift(value);
		entryMode = true;
	}

	updateDisplay();
}

addEventListener('load', resizeText);
addEventListener('resize', resizeText);

for (const button of document.querySelectorAll('button')) {
	button.addEventListener('click', (event) => {
		switch (event.currentTarget.value) {
			case '+': {
				break;
			}

			case '-': {
				break;
			}

			case '*': {
				break;
			}

			case '/': {
				break;
			}

			case '^': {
				break;
			}

			case '.': {
				break;
			}

			case 'ac': {
				break;
			}

			case 'del': {
				break;
			}

			case 'enter': {
				if (entryMode) {
					entryMode = false;
				}

				updateDisplay();
				break;
			}

			default: {
				console.log(event.currentTarget.value);
				input(event.currentTarget.value);
				break;
			}
		}
	});
}
