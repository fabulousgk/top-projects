const sketchArea = document.querySelector('#sketch-area');
let colorMode = 'normal';

function generateGrid(size) {
	sketchArea.textContent = '';
	for (let i = 0; i < size * size; i++) {
		const cell = document.createElement('div');
		cell.style.width = `${(1 / size) * 100}%`;
		cell.classList.add('cell');
		cell.addEventListener('click', draw);
		cell.addEventListener('mouseover', draw);
		sketchArea?.append(cell);
	}
}

function draw(event) {
	if (colorMode === 'normal') {
		event.target.style.backgroundColor = '#444444';
	} else {
		event.target.style.backgroundColor = `rgb(${Math.floor(
			Math.random() * 256,
		)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
	}
}

document.querySelector('#settings-button')?.addEventListener('click', () => {
	sketchArea?.classList.toggle('hidden');
	document.querySelector('#settings-pane')?.classList.toggle('hidden');
});

document.querySelector('#erase-button')?.addEventListener('click', () => {
	const cells = document.querySelectorAll('.cell');
	for (const cell of cells) cell.style.backgroundColor = 'transparent';
});

document.querySelector('#grid-size')?.addEventListener('input', (event) => {
	document.querySelector('#grid-size-label').textContent = event.target.value;
});

document.querySelector('#grid-size')?.addEventListener('change', (event) => {
	document.querySelector('#grid-size-label').textContent = event.target.value;
	generateGrid(event.target.value);
});

const colorOptions = document.querySelectorAll('input[name=color-mode]');
for (const option of colorOptions) {
	option?.addEventListener('change', (event) => {
		colorMode = event.target.value;
	});
}

document.querySelector('#grid-size')?.dispatchEvent(new InputEvent('change'));
