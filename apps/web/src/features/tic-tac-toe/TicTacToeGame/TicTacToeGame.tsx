import { TicTacToeGameState } from '@canny-games/common';
import { Container } from '@mui/material';
import {
  useGameStateListenerQuery,
  usePerformActionMutation,
} from '../ticTacToe.api';
import { PlayerTurn } from './components/PlayerTurn';
import { Board } from './components/TicTacToeBoard';
import { Winner } from './components/Winner';
import S from './TicTacToeGame.styled';

type TicTacToeGameProps = {
  gameState: TicTacToeGameState;
  matchId: string;
};

export const TicTacToeGame = ({ gameState, matchId }: TicTacToeGameProps) => {
  const {
    settings: { size },
  } = gameState;
  const [trigger] = usePerformActionMutation();

  const {} = useGameStateListenerQuery(null);

  const handleCellClick = (row: number, col: number) => {
    trigger({
      matchId,
      playerAction: {
        row,
        col,
      },
    });
  };

  return (
    <Container>
      <S.GamePaper>
        <PlayerTurn />
        <Board
          size={size}
          cells={gameState.board}
          onCellClick={handleCellClick}
        />
        <Winner gameState={gameState} />
      </S.GamePaper>
    </Container>
  );
};
