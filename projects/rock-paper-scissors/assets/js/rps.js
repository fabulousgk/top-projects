/* global textFit */

const CHOICES = ['Rock', 'Paper', 'Scissors', 'Spock', 'Lizard'];

const sheldonText = document.querySelector('#sheldon p');

let playerScore = 0;
let sheldonScore = 0;

function getComputerChoice() {
	return Math.floor(Math.random() * CHOICES.length);
}

function calculateResult(player1Choice, player2Choice) {
	if (player1Choice === player2Choice) {
		return 2;
	}

	// See https://medium.com/@jp.mfichtl/rock-paper-scissors-lizard-spock-or-why-math-is-awesome-for-coding-405dabe30f4
	return (
		((player1Choice - player2Choice + CHOICES.length) % CHOICES.length) % 2
	);
}

function playRound(event) {
	const sheldonChoice = getComputerChoice();

	let result = '';

	switch (calculateResult(CHOICES.indexOf(event.target.id), sheldonChoice)) {
		case 1: {
			playerScore++;
			result = 'you win.';
			break;
		}

		case 0: {
			sheldonScore++;
			result = 'I win!';
			break;
		}

		default: {
			result = 'we tied.';
			break;
		}
	}

	if (playerScore === 5) {
		if (sheldonText) {
			sheldonText.textContent = `I chose ${CHOICES[sheldonChoice]}, ${result}
			The score is ${playerScore} to ${sheldonScore}. This is impossible, I can't loose. Choose again to start a new game.`;
			textFit(sheldonText, {
				alignHoriz: true,
				alignVert: true,
			});
		}

		playerScore = 0;
		sheldonScore = 0;
	} else if (sheldonScore === 5) {
		if (sheldonText) {
			sheldonText.textContent = `I chose ${CHOICES[sheldonChoice]}, ${result}
			The score is ${playerScore} to ${sheldonScore}. Bazinga! My superior intellect beat you. Choose again to start a new game.`;
			textFit(sheldonText, {
				alignHoriz: true,
				alignVert: true,
			});
		}

		playerScore = 0;
		sheldonScore = 0;
	} else if (sheldonText) {
		sheldonText.textContent = `I chose ${CHOICES[sheldonChoice]}, ${result} The score is ${playerScore} to ${sheldonScore}. Choose again.`;
		textFit(sheldonText, {
			alignHoriz: true,
			alignVert: true,
		});
	}
}

for (const element of document.querySelectorAll('.weapon')) {
	element.addEventListener('click', playRound);
}

addEventListener('load', () => {
	textFit(sheldonText, {
		alignHoriz: true,
		alignVert: true,
	});
});
