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
		document.querySelector('#line1-indicator').textContent = '1▸ ';
		document.querySelector('#line1-div .textFitted').style.justifyContent =
			'start';
	} else {
		document.querySelector('#line1-indicator').textContent = '1:';
		document.querySelector('#line1-div .textFitted')?.removeAttribute('style');
	}

	resizeText();
}

function input(value) {
	if (
		value !== '0' ||
		(entryMode && value === '0' && calcStack[0].length > 0)
	) {
		if (entryMode) {
			calcStack[0] += value;
		} else {
			calcStack.unshift(value);
			entryMode = true;
		}
	}

	updateDisplay();
}

addEventListener('load', resizeText);
addEventListener('resize', resizeText);

for (const button of document.querySelectorAll('button')) {
	button.addEventListener('click', (event) => {
		switch (event.currentTarget.value) {
			case '+': {
				if (calcStack.length >= 2) {
					const result = Number(calcStack[1]) + Number(calcStack[0]);
					calcStack.shift();
					calcStack.shift();
					calcStack.unshift(result);
					entryMode = false;
					updateDisplay();
				}

				break;
			}

			case '-': {
				if (calcStack.length >= 2) {
					const result = Number(calcStack[1]) - Number(calcStack[0]);
					calcStack.shift();
					calcStack.shift();
					calcStack.unshift(result);
					entryMode = false;
					updateDisplay();
				}

				break;
			}

			case '*': {
				if (calcStack.length >= 2) {
					const result = Number(calcStack[1]) * Number(calcStack[0]);
					calcStack.shift();
					calcStack.shift();
					calcStack.unshift(result);
					entryMode = false;
					updateDisplay();
				}

				break;
			}

			case '/': {
				if (calcStack.length >= 2) {
					const result = Number(calcStack[1]) / Number(calcStack[0]);
					calcStack.shift();
					calcStack.shift();
					calcStack.unshift(result);
					entryMode = false;
					updateDisplay();
				}

				break;
			}

			case '^': {
				if (calcStack.length >= 2) {
					const result = Number(calcStack[1]) ** Number(calcStack[0]);
					calcStack.shift();
					calcStack.shift();
					calcStack.unshift(result);
					entryMode = false;
					updateDisplay();
				}

				break;
			}

			case '.': {
				if (entryMode) {
					if (calcStack[0].length === 0) {
						input('0.');
					} else if (calcStack[0].search(/\./) === -1) {
						input('.');
					}
				} else {
					input('0.');
				}

				break;
			}

			case 'ac': {
				calcStack.length = 0;
				entryMode = false;
				updateDisplay();
				break;
			}

			case 'del': {
				if (entryMode) {
					calcStack[0] = calcStack[0].slice(0, -1);
				} else {
					entryMode = true;
				}

				updateDisplay();
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
				input(event.currentTarget.value);
				break;
			}
		}
	});
}
