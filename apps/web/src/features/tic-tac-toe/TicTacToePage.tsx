import { useAppSelector } from '@/hooks/useAppSelector';
import { PageTitle } from '@/components/common/PageTitle';
import { Matchmaking } from '../matchmaking';
import { TicTacToeGame } from './TicTacToeGame/TicTacToeGame';
import { TicTacToeSocket } from './TicTacToeSocket/TicTacToeSocket';

export const TicTacToePage = () => {
  const gameState = useAppSelector((state) => state.ticTacToe.gameState);
  const matchId = useAppSelector((state) => state.ticTacToe.matchId);

  return (
    <>
      <PageTitle>Tic Tac Toe</PageTitle>
      <TicTacToeSocket>
        {gameState && matchId ? (
          <TicTacToeGame
            gameState={gameState}
            matchId={matchId}
          />
        ) : (
          <Matchmaking />
        )}
      </TicTacToeSocket>
    </>
  );
};
