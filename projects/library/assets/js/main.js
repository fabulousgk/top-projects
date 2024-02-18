const library = [];

function Book(title, author, pages, isRead = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;

	const colors = ['brown', 'green', 'blue'];
	this.color = colors[Math.floor(Math.random() * colors.length)];

	const textures = ['pyramid', 'stairs', 'argyle', 'tartan'];
	this.texture = textures[Math.floor(Math.random() * textures.length)];

	this.fontColor = Math.floor(Math.random() >= 0.75) ? 'gold' : 'silver';

	this.id = crypto.randomUUID();
}

function updateDisplay() {
	const bookCase = document.querySelector('.case');
	if (bookCase) {
		bookCase.textContent = '';
		if (library.length > 0) {
			// eslint-disable-next-line unicorn/prefer-query-selector
			const shelves = document.getElementsByClassName('shelf');

			let availableSpace = 0;

			for (const book of library) {
				const bookGui = document.createElement('div');
				bookGui.classList.add('book');
				bookGui.textContent = book.title;
				bookGui.classList.add(book.color);
				bookGui.classList.add(book.texture);
				bookGui.classList.add(book.fontColor);
				bookGui.setAttribute('id', book.id);
				bookGui.addEventListener('click', (event) => showForm(event));

				const temporaryShelf = document.createElement('div');
				temporaryShelf.classList.add('shelf');
				temporaryShelf.style = 'visibility: hidden';
				bookCase.append(temporaryShelf);

				temporaryShelf.append(bookGui);
				const bookWidth = bookGui.offsetWidth;
				temporaryShelf.remove();

				if (availableSpace < bookWidth) {
					const shelf = document.createElement('div');
					shelf.classList.add('shelf');
					bookCase.append(shelf);
					availableSpace = 517;
				}

				shelves.item(shelves.length - 1).append(bookGui);
				availableSpace -= bookWidth;
			}
		}
	}
}

// eslint-disable-next-line no-unused-vars
function addBook(title, author, pages, isRead) {
	library.push(new Book(title, author, pages, isRead));
	library.sort((a, b) => {
		if (a.title.toLowerCase() < b.title.toLowerCase()) {
			return -1;
		}

		if (a.title.toLowerCase() > b.title.toLowerCase()) {
			return 1;
		}

		return 0;
	});
	updateDisplay();
}

function showForm(event) {
	if (event) {
		const book = library.find((item) => item.id === event.target.id);

		document.querySelector('#title').value = book.title;
		document.querySelector('#author').value = book.author;
		document.querySelector('#pages').value = book.pages;
		document.querySelector('#is-read').checked = book.isRead;

		document.querySelector('#delete-book').hidden = false;
	}

	document.querySelector('dialog').showModal();
}

document.querySelector('#new-book').addEventListener('click', () => showForm());
document.querySelector('#cancel').addEventListener('click', (event) => {
	event.preventDefault();
	document.querySelector('form').reset();
	document.querySelector('dialog').close();
});
