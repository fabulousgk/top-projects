class Book {
	constructor(title, author, pages, isRead = false) {
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

	editTitle(title) {
		this.title = title;
	}

	editAuthor(author) {
		this.author = author;
	}

	editPages(pages) {
		this.pages = pages;
	}

	toggleRead() {
		this.isRead = !this.isRead;
	}
}

class Library {
	books = [];

	newBook(title, author, pages, isRead = false) {
		this.books.push(new Book(title, author, pages, isRead));
	}

	sort() {
		this.books.sort((a, b) => {
			if (a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1;
			}

			if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1;
			}

			return 0;
		});
	}

	removeBook(id) {
		const index = this.books.findIndex((item) => item.id === id);
		this.books.splice(index, 1);
	}

	// eslint-disable-next-line max-params
	editBook(id, title, author, pages, isRead) {
		const book = this.books.find((item) => item.id === id);
		if (title) book.editTitle(title);
		if (author) book.editAuthor(author);
		if (pages) book.editPages(pages);
		if (book.isRead !== isRead) book.toggleRead();
	}
}

class LibraryUI {
	bookCase = document.querySelector('.case');
	titleForm = document.querySelector('#title');
	authorForm = document.querySelector('#author');
	pagesForm = document.querySelector('#pages');
	isReadForm = document.querySelector('#is-read');
	bookIDForm = document.querySelector('#book-id');

	library = new Library();

	updateDisplay() {
		this.library.sort();
		if (this.bookCase) {
			this.bookCase.textContent = '';
			if (this.library.books.length > 0) {
				// eslint-disable-next-line unicorn/prefer-query-selector
				const shelves = document.getElementsByClassName('shelf');

				let availableSpace = 0;

				for (const book of this.library.books) {
					const bookGui = document.createElement('div');
					bookGui.classList.add('book');
					bookGui.textContent = book.title;
					bookGui.classList.add(book.color);
					bookGui.classList.add(book.texture);
					bookGui.classList.add(book.fontColor);
					bookGui.setAttribute('id', book.id);
					bookGui.addEventListener('click', (event) => this.showForm(event));
					bookGui.style = `min-width: ${24 + book.pages * 0.025}px`;

					const temporaryShelf = document.createElement('div');
					temporaryShelf.classList.add('shelf');
					temporaryShelf.style = 'visibility: hidden';
					this.bookCase.append(temporaryShelf);

					temporaryShelf.append(bookGui);
					const bookWidth = bookGui.offsetWidth;
					temporaryShelf.remove();

					if (availableSpace < bookWidth) {
						const shelf = document.createElement('div');
						shelf.classList.add('shelf');
						this.bookCase.append(shelf);
						availableSpace = 517;
					}

					shelves.item(shelves.length - 1).append(bookGui);
					availableSpace -= bookWidth;
				}
			}
		}
	}

	showForm(event) {
		document.querySelector('#add-book').textContent = 'Add Book';

		if (event) {
			const book = this.library.books.find(
				(item) => item.id === event.target.id,
			);

			document.querySelector('#title').value = book.title;
			document.querySelector('#author').value = book.author;
			document.querySelector('#pages').value = book.pages;
			document.querySelector('#is-read').checked = book.isRead;
			document.querySelector('#book-id').value = book.id;
			document.querySelector('#delete-book').hidden = false;
			document.querySelector('#add-book').textContent = 'Update Book';
		}

		document.querySelector('dialog').showModal();
	}

	constructor() {
		document
			.querySelector('#new-book')
			.addEventListener('click', () => this.showForm());

		document.querySelector('#cancel').addEventListener('click', (event) => {
			event.preventDefault();
			document.querySelector('#book-id').value = '';
			document.querySelector('form').reset();
			document.querySelector('dialog').close();
		});

		document.querySelector('form').addEventListener('submit', (event) => {
			event.preventDefault();

			if (document.querySelector('#book-id').value === '') {
				this.library.newBook(
					this.titleForm.value,
					this.authorForm.value,
					this.pagesForm.value,
					this.isReadForm.checked,
				);
			} else {
				this.library.editBook(
					this.bookIDForm.value,
					this.titleForm.value,
					this.authorForm.value,
					this.pagesForm.value,
					this.isReadForm.checked,
				);
			}

			document.querySelector('#book-id').value = '';
			document.querySelector('form').reset();
			document.querySelector('dialog').close();

			this.updateDisplay();
		});

		document
			.querySelector('#delete-book')
			.addEventListener('click', (event) => {
				event.preventDefault();

				this.library.removeBook(document.querySelector('#book-id').value);

				document.querySelector('#book-id').value = '';
				document.querySelector('form').reset();
				document.querySelector('dialog').close();

				this.updateDisplay();
			});
	}

	populateSamples() {
		this.library.newBook('The Hunger Games', 'Suzanne Collins', 374);
		this.library.newBook(
			'Harry Potter and the Order of the Phoenix',
			'J.K. Rowling',
			870,
		);
		this.library.newBook('To Kill a Mockingbird', 'Harper Lee', 324);
		this.library.newBook('Pride and Prejudice', 'Jane Austen', 279);
		this.library.newBook('Twilight', 'Stephenie Meyer', 501);
		this.library.newBook('The Book Thief', 'Markus Zusa', 552);
		this.library.newBook('Animal Farm', 'George Orwell', 141);
		this.library.newBook('The Chronicles of Narnia', 'C.S. Lewis', 767);
		this.library.newBook('Gone with the Wind', 'Margaret Mitchell', 1037);
		this.library.newBook('The Fault in Our Stars', 'John Green ', 313);
		this.library.newBook(
			"The Hitchhiker's Guide to the Galaxy",
			'Douglas Adams',
			193,
		);
		this.library.newBook('The Giving Tree', 'Shel Silverstein', 64);
		this.library.newBook('Wuthering Heights', 'Emily Bronte´', 464);
		this.library.newBook('The Da Vinci Code', 'Dan Brown', 489);
		this.library.newBook('Memoirs of a Geisha', 'Arthur Golden', 503);
		this.library.newBook('The Picture of Dorian Gray', 'Oscar Wilde', 272);
		this.library.newBook('Jane Eyre', 'Charlotte Bronte', 532);
		this.library.newBook('Les Miserables', 'Victor Hugo', 1463);
		this.library.newBook('Fahrenheit 451', 'Ray Bradbury', 194);
		this.library.newBook('Divergent', 'Veronica Roth', 487);
		this.library.newBook('Lord of the Flies', 'William Golding', 182);
		this.library.newBook('Romeo and Juliet', 'William Shakespeare', 301);
		this.library.newBook('The Alchemist', 'Paulo Coelho', 182);
		this.library.newBook('Crime and Punishment', 'Fyodor Dostoyevsky', 671);
		this.library.newBook(
			'The Perks of Being a Wallflower',
			'Stephen Chbosky',
			213,
		);
		this.library.newBook('The Great Gatsby', 'F. Scott Fitzgerald', 200);
		this.library.newBook('City of Bones', 'Cassandra Clare', 485);
		this.library.newBook("Ender's Game", 'Orson Scott Card', 324);
		this.library.newBook('The Help', 'Kathryn Stockett', 451);
		this.library.newBook('Anne of Green Gables', 'L.M. Montgomery', 320);
		this.library.newBook(
			"Harry Potter and the Sorcerer's Stone",
			'J.K. Rowling',
			309,
		);
		this.library.newBook('The Little Prince', 'Antoine de Saint-Exupery', 93);
		this.library.newBook("Charlotte's Web", 'E.B. White', 184);
		this.library.newBook('Of Mice and Men', 'John Steinbeck', 103);
		this.library.newBook("The Time Traveler's Wife", 'Audrey Niffenegger', 500);
		this.updateDisplay();
	}
}

// eslint-disable-next-line no-unused-vars
const libraryUI = new LibraryUI();
