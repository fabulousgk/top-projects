const sketchArea = document.querySelector('#sketch-area');

function generateGrid(size) {
	sketchArea.textContent = '';
	for (let i = 0; i < size * size; i++) {
		const cell = document.createElement('div');
		cell.style.width = `${(1 / size) * 100}%`;
		cell.addEventListener('click', draw);
		cell.addEventListener('mouseover', draw);
		sketchArea?.append(cell);
	}
}

function draw(event) {
	event.target.style.backgroundColor = '#444444';
}

document.querySelector('#settings-button')?.addEventListener('click', () => {
	sketchArea?.classList.toggle('hidden');
	document.querySelector('#settings-pane')?.classList.toggle('hidden');
});

document.querySelector('#grid-size')?.addEventListener('input', (event) => {
	document.querySelector('#grid-size-label').textContent = event.target.value;
});

document.querySelector('#grid-size')?.addEventListener('change', (event) => {
	generateGrid(event.target.value);
});

generateGrid(55);
