const CHOICES = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
	return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function playRound(playerSelection, computerSelection) {
	const playerSelectionConverted =
		playerSelection.slice(0, 1).toUpperCase() +
		playerSelection.slice(1).toLowerCase();

	if (playerSelectionConverted === computerSelection) {
		return 'You choose the same item, try again.';
	}

	if (playerSelectionConverted === 'Rock' && computerSelection === 'Scissors') {
		return `You win! ${playerSelection} beats ${computerSelection}`;
	}

	if (playerSelectionConverted === 'Paper' && computerSelection === 'Rock') {
		return `You win! ${playerSelection} beats ${computerSelection}`;
	}

	if (
		playerSelectionConverted === 'Scissors' &&
		computerSelection === 'Paper'
	) {
		return `You win! ${playerSelection} beats ${computerSelection}`;
	}

	return `You loose! ${computerSelection} beats ${playerSelection}`;
}

console.log(playRound('Rock', getComputerChoice()));
