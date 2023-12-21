const CHOICES = ['Rock', 'Paper', 'Scissors'];
const LOOSE = 0;
const WIN = 1;
const TIE = 2;

function getComputerChoice() {
	return Math.floor(Math.random() * CHOICES.length);
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		return TIE;
	}

	// See https://medium.com/@jp.mfichtl/rock-paper-scissors-lizard-spock-or-why-math-is-awesome-for-coding-405dabe30f4
	return ((playerSelection - computerSelection + CHOICES.length) % 3) % 2;
}

function game() {
	let playerScore = 0;
	let computerScore = 0;

	let playerChoice = Number(
		// eslint-disable-next-line no-alert
		prompt('Choose item by number - 1: Rock, 2: Paper, 3: Scissors'),
	);
	let computerChoice = getComputerChoice();

	switch (playRound(playerChoice, computerChoice)) {
		case LOOSE: {
			console.log(
				`You Loose! ${CHOICES[computerChoice]} beats ${CHOICES[playerChoice]}`,
			);
			computerScore++;
			break;
		}

		case WIN: {
			console.log(
				`You Win! ${CHOICES[playerChoice]} beats ${CHOICES[computerChoice]}`,
			);
			playerScore++;
			break;
		}

		default: {
			console.log('You choose the same items, its a tie.');
			break;
		}
	}

	playerChoice = Number(
		// eslint-disable-next-line no-alert
		prompt('Choose item by number - 1: Rock, 2: Paper, 3: Scissors'),
	);
	computerChoice = getComputerChoice();

	switch (playRound(playerChoice, computerChoice)) {
		case LOOSE: {
			console.log(
				`You Loose! ${CHOICES[computerChoice]} beats ${CHOICES[playerChoice]}`,
			);
			computerScore++;
			break;
		}

		case WIN: {
			console.log(
				`You Win! ${CHOICES[playerChoice]} beats ${CHOICES[computerChoice]}`,
			);
			playerScore++;
			break;
		}

		default: {
			console.log('You choose the same items, its a tie.');
			break;
		}
	}

	playerChoice = Number(
		// eslint-disable-next-line no-alert
		prompt('Choose item by number - 1: Rock, 2: Paper, 3: Scissors'),
	);
	computerChoice = getComputerChoice();

	switch (playRound(playerChoice, computerChoice)) {
		case LOOSE: {
			console.log(
				`You Loose! ${CHOICES[computerChoice]} beats ${CHOICES[playerChoice]}`,
			);
			computerScore++;
			break;
		}

		case WIN: {
			console.log(
				`You Win! ${CHOICES[playerChoice]} beats ${CHOICES[computerChoice]}`,
			);
			playerScore++;
			break;
		}

		default: {
			console.log('You choose the same items, its a tie.');
			break;
		}
	}

	playerChoice = Number(
		// eslint-disable-next-line no-alert
		prompt('Choose item by number - 1: Rock, 2: Paper, 3: Scissors'),
	);
	computerChoice = getComputerChoice();

	switch (playRound(playerChoice, computerChoice)) {
		case LOOSE: {
			console.log(
				`You Loose! ${CHOICES[computerChoice]} beats ${CHOICES[playerChoice]}`,
			);
			computerScore++;
			break;
		}

		case WIN: {
			console.log(
				`You Win! ${CHOICES[playerChoice]} beats ${CHOICES[computerChoice]}`,
			);
			playerScore++;
			break;
		}

		default: {
			console.log('You choose the same items, its a tie.');
			break;
		}
	}

	playerChoice = Number(
		// eslint-disable-next-line no-alert
		prompt('Choose item by number - 1: Rock, 2: Paper, 3: Scissors'),
	);
	computerChoice = getComputerChoice();

	switch (playRound(playerChoice, computerChoice)) {
		case LOOSE: {
			console.log(
				`You Loose! ${CHOICES[computerChoice]} beats ${CHOICES[playerChoice]}`,
			);
			computerScore++;
			break;
		}

		case WIN: {
			console.log(
				`You Win! ${CHOICES[playerChoice]} beats ${CHOICES[computerChoice]}`,
			);
			playerScore++;
			break;
		}

		default: {
			console.log('You choose the same items, its a tie.');
			break;
		}
	}

	if (playerScore > computerScore) {
		console.log(`Congrats, you win.`);
	} else if (playerScore < computerScore) {
		console.log(`Oh no, you lost.`);
	} else {
		console.log('It is a tie game.');
	}
}

game();
