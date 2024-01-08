import { InvalidMoveError } from './errors/invalid-move.error';

enum TicTacToePlayer {
  X = 'X',
  O = 'O',
}

type TicTacToeBoard = TicTacToePlayer[][];

type TicTacToeSettings = {
  size: number;
  winCondition: number;
};

interface TicTacToeGameState {
  board: TicTacToeBoard;
  settings: TicTacToeSettings;
  currentPlayer: TicTacToePlayer;
  winner: TicTacToePlayer | null | 'DRAW';
}

interface TicTacToePlayerAction {
  row: number;
  col: number;
}

function createBoard(size: number): TicTacToeBoard {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

type InitializeGameProps = {
  settings: TicTacToeSettings;
};
function initializeGame({ settings }: InitializeGameProps): TicTacToeGameState {
  const board: TicTacToePlayer[][] = createBoard(settings.size);
  const currentPlayer: TicTacToePlayer = TicTacToePlayer.X;
  const winner: TicTacToePlayer | null = null;

  return { board, settings, currentPlayer, winner };
}

type IsMovePossibleProps = {
  gameState: TicTacToeGameState;
  row: number;
  col: number;
};
function isMovePossible({ gameState, row, col }: IsMovePossibleProps): boolean {
  const {
    settings: { size },
    board,
  } = gameState;

  return board[row][col] === null && row < size && col < size;
}

type CheckGameEndedProps = {
  gameState: TicTacToeGameState;
};
function checkGameEnded({ gameState }: CheckGameEndedProps): boolean {
  if (gameState.winner !== null) {
    return true;
  }

  return !boardHasEmptyCells(gameState.board);
}

type CheckWinnerProps = {
  gameState: TicTacToeGameState;
  row: number;
  col: number;
};
function checkWinner({
  gameState,
  row,
  col,
}: CheckWinnerProps): TicTacToePlayer | null {
  const {
    settings: { winCondition, size },
    currentPlayer,
    board,
  } = gameState;

  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [dr, dc] of directions) {
    let count = 0;

    for (let i = -1; i <= 1; i += 2) {
      for (let step = 1; step < winCondition; step++) {
        const r = row + i * step * dr;
        const c = col + i * step * dc;

        if (
          r < 0 ||
          r >= size ||
          c < 0 ||
          c >= size ||
          board[r][c] !== currentPlayer
        ) {
          break;
        }

        count++;
      }
    }

    if (count >= winCondition - 1) {
      return currentPlayer;
    }
  }

  return null;
}

function boardHasEmptyCells(board: TicTacToeBoard): boolean {
  return board.flat().some((cell) => cell === null);
}

function switchPlayer(player: TicTacToePlayer): TicTacToePlayer {
  return player === TicTacToePlayer.X ? TicTacToePlayer.O : TicTacToePlayer.X;
}

type PerformMoveProps = {
  gameState: TicTacToeGameState;
  row: number;
  col: number;
};
function performMove({
  gameState,
  row,
  col,
}: PerformMoveProps): TicTacToeGameState {
  if (
    !isMovePossible({ gameState, row, col }) ||
    checkGameEnded({ gameState })
  ) {
    throw new InvalidMoveError();
  }

  const { board, currentPlayer } = gameState;

  const newBoard = board.map((row) => row.slice());
  newBoard[row][col] = currentPlayer;

  const winner = checkWinner({
    gameState: { ...gameState, board: newBoard },
    row,
    col,
  });

  if (winner === null && !boardHasEmptyCells(newBoard)) {
    return {
      ...gameState,
      board: newBoard,
      winner: 'DRAW',
      currentPlayer: switchPlayer(gameState.currentPlayer),
    };
  }

  return {
    ...gameState,
    board: newBoard,
    winner,
    currentPlayer: switchPlayer(gameState.currentPlayer),
  };
}

function getCurrentPlayer(board: TicTacToeBoard): TicTacToePlayer {
  const flatBoard = board.flat();
  const xCount = flatBoard.filter((cell) => cell === 'X').length;
  const oCount = flatBoard.filter((cell) => cell === 'O').length;

  return xCount === oCount ? TicTacToePlayer.X : TicTacToePlayer.O;
}

export {
  initializeGame,
  isMovePossible,
  checkGameEnded,
  checkWinner,
  boardHasEmptyCells,
  switchPlayer,
  performMove,
  createBoard,
  getCurrentPlayer,
  TicTacToePlayer,
};

export type { TicTacToeGameState, TicTacToePlayerAction, TicTacToeSettings };
