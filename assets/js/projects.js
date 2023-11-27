// @ts-nocheck
const template = document.querySelector('template');
const cardsContainer = document.querySelector('#cards');

const file = await fetch('projects.json');
const projects = await file.json();
projects.sort(function (a, b) {
	return a.order - b.order;
});

for (const project of projects) {
	const newCard = template.content.cloneNode(true);

	newCard.children[0].children[0].children[0].children[0].textContent =
		project.title;

	newCard.children[0].children[0].children[0].setAttribute(
		'href',
		`projects/${project.slug}`,
	); // Demo link on title

	newCard.children[0].children[0].children[1].setAttribute(
		'href',
		`https://github.com/fabulousgk/top-projects/tree/main/projects/${project.slug}`,
	); // Repository link

	newCard.children[0].children[1].setAttribute(
		'href',
		`projects/${project.slug}`,
	); // Demo link on screenshot

	newCard.children[0].children[1].children[0].setAttribute(
		'src',
		`projects/${project.slug}/assets/images/screenshot.png`,
	); // Screenshot

	newCard.children[0].children[1].children[0].setAttribute(
		'alt',
		`${project.title} screenshot`,
	);

	cardsContainer.append(newCard);
}
