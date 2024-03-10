const gameBoard = () => {
	const _gameBoard = [
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
	];
	let attachedUI;

	function mark(row, col, symbol) {
		_gameBoard[row][col] = symbol;
		if (attachedUI) attachedUI.mark(row, col, symbol);
	}

	function reset() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				_gameBoard[i][j] = undefined;
			}
		}

		if (attachedUI) attachedUI.reset();
	}

	function isFull() {
		let filledCells = 0;

		for (const row of _gameBoard) {
			for (const cell of row) {
				if (cell) {
					filledCells++;
				}
			}
		}

		return filledCells === 9;
	}

	function isTerminal() {
		// Check rows
		for (let i = 0; i < 3; i++) {
			if (
				_gameBoard[i][0] !== undefined &&
				_gameBoard[i][0] === _gameBoard[i][1] &&
				_gameBoard[i][0] === _gameBoard[i][2]
			) {
				return _gameBoard[i][0];
			}
		}

		// Check cols
		for (let i = 0; i < 3; i++) {
			if (
				_gameBoard[0][i] !== undefined &&
				_gameBoard[0][i] === _gameBoard[1][i] &&
				_gameBoard[0][i] === _gameBoard[2][i]
			) {
				return _gameBoard[0][i];
			}
		}

		// Check diagonals
		if (
			_gameBoard[0][0] !== undefined &&
			_gameBoard[0][0] === _gameBoard[1][1] &&
			_gameBoard[0][0] === _gameBoard[2][2]
		) {
			return _gameBoard[0][0];
		}

		if (
			_gameBoard[0][2] !== undefined &&
			_gameBoard[0][2] === _gameBoard[1][1] &&
			_gameBoard[0][2] === _gameBoard[2][0]
		) {
			return _gameBoard[0][2];
		}

		// If no winner, check for a tie
		if (isFull()) {
			return null;
		}

		return false;
	}

	function registerUI(UI) {
		attachedUI = UI;
	}

	function getEmptyCells() {
		const emptyCells = [];
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (!_gameBoard[row][col]) {
					emptyCells.push({row, col});
				}
			}
		}

		return emptyCells;
	}

	return {
		mark,
		reset,
		isFull,
		isTerminal,
		registerUI,
		getEmptyCells,
	};
};

const player = (symbol, gameBoard, isAI = false) => {
	function turn(event) {
		if (isAI) {
			const {row, col} = _getBestMove(gameBoard);
			gameBoard.mark(row, col, symbol);
		} else {
			gameBoard.mark(
				event.target.dataset.row,
				event.target.dataset.col,
				symbol,
			);
		}
	}

	function getSymbol() {
		return symbol;
	}

	function getAI() {
		return isAI;
	}

	function setAI(state) {
		isAI = state;
	}

	function _getBestMove(gameBoard) {
		const emptyCells = gameBoard.getEmptyCells();
		const randomIndex = Math.floor(Math.random() * emptyCells.length);
		return emptyCells[randomIndex];
	}

	return {
		turn,
		getSymbol,
		getAI,
		setAI,
	};
};

const gameBoardUI = (function (container) {
	function mark(row, col, symbol) {
		const mark = document.createElement('img');
		mark.setAttribute('src', `assets/images/${symbol}.svg`);
		document
			.querySelector(`[data-row="${row}"][data-col="${col}"]`)
			.append(mark);
	}

	function reset() {
		for (const cell of container.children) {
			if (cell.firstChild) {
				cell.firstChild.remove();
			}
		}
	}

	function registerEventListeners(eventHandler) {
		for (let i = 0; i < 9; i++) {
			container.children[i].addEventListener('click', eventHandler);
		}
	}

	return {
		mark,
		reset,
		registerEventListeners,
	};
})(document.querySelector('#gameboard'));

// eslint-disable-next-line no-unused-vars
const game = (function () {
	const _gameBoard = gameBoard();
	_gameBoard.registerUI(gameBoardUI);
	const _player1 = player('x', _gameBoard);
	const _player2 = player('o', _gameBoard);

	let _currentPlayer = _player1;
	let _gameInProgress = true;
	let _isAITakingTurn = false;

	let _player1Score = 0;
	let _player2Score = 0;
	let _joshuaScore = 0;
	let _tieScore = 0;

	gameBoardUI.registerEventListeners(play);
	document.querySelector('#reset').addEventListener('click', newGame);
	document
		.querySelector('#clear-scores')
		.addEventListener('click', clearScores);
	document.querySelector('#activate-ai').addEventListener('click', toggleAI);

	async function play(event) {
		if (_isAITakingTurn && !_currentPlayer.getAI()) return;
		if (
			_gameInProgress &&
			(event === undefined ||
				(event.target.tagName !== 'IMG' &&
					event.target.childElementCount === 0))
		) {
			const opponent = _currentPlayer === _player1 ? _player2 : _player1;
			_currentPlayer.turn(event);

			const result = _gameBoard.isTerminal();
			if (result !== false) {
				_gameInProgress = false;
				if (result === null) {
					if (_player2.getAI()) {
						document.querySelector('#joshua-text').textContent =
							'A strange game. The only winning move is not to play.';
					} else {
						document.querySelector('#joshua-text').textContent = 'Tie Game';
					}

					_tieScore++;
				} else {
					if (_player2.getAI()) {
						document.querySelector('#joshua-text').textContent =
							'A strange game. The only winning move is not to play.';
					} else {
						document.querySelector('#joshua-text').textContent =
							`${_currentPlayer.getSymbol()} wins!`;
					}

					if (_currentPlayer === _player1) {
						_player1Score++;
					} else if (_currentPlayer === _player2 && !_player2.getAI()) {
						_player2Score++;
					} else {
						_joshuaScore++;
					}
				}

				_updateScoreBoard();
			}

			_currentPlayer = _currentPlayer === _player1 ? _player2 : _player1;

			if (opponent.getAI()) {
				_isAITakingTurn = true;
				await new Promise((resolve) => setTimeout(resolve, 500)); // eslint-disable-line no-promise-executor-return
				play();
				_isAITakingTurn = false;
			}
		}
	}

	function toggleAI() {
		if (_player2.getAI()) {
			_player2.setAI(false);
			document.querySelector('#activate-ai').classList.remove('active');
			newGame();
		} else {
			_player2.setAI(true);
			document.querySelector('#activate-ai').classList.add('active');
			newGame();
		}
	}

	function newGame() {
		_gameBoard.reset();
		_gameInProgress = true;
		_currentPlayer = _player1;
		document.querySelector('#joshua-text').textContent =
			'Shall we play a game?';
	}

	function _updateScoreBoard() {
		document.querySelector('#player1-score').textContent = _player1Score;
		document.querySelector('#player2-score').textContent = _player2Score;
		document.querySelector('#joshua-score').textContent = _joshuaScore;
		document.querySelector('#tie-score').textContent = _tieScore;
	}

	function clearScores() {
		_player1Score = 0;
		_player2Score = 0;
		_joshuaScore = 0;
		_tieScore = 0;
		_updateScoreBoard();
	}
})();
