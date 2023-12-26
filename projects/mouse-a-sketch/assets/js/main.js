const sketchArea = document.querySelector('#sketch-area');

function generateGrid(size) {
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

generateGrid(16);
