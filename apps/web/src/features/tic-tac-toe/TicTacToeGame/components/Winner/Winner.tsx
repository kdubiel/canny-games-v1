import { TicTacToeGameState } from '@canny-games/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { restart } from '@/features/tic-tac-toe/ticTacToe.slice';
import { BigButton } from '@/components/common/BigButton';
import S from './Winner.styled';

type WinnerProps = {
  gameState: TicTacToeGameState;
};

export const Winner = ({ gameState }: WinnerProps) => {
  const dispatch = useAppDispatch();

  const restartHandler = () => {
    dispatch(restart());
  };

  return (
    <>
      {gameState.winner && (
        <S.Wrapper>
          <S.WinnerMessage>
            {gameState.winner !== 'DRAW'
              ? `Player ${gameState.winner} wins!`
              : 'Draw!'}
          </S.WinnerMessage>
          <BigButton
            onClick={restartHandler}
            color="success"
          >
            Restart
          </BigButton>
        </S.Wrapper>
      )}
    </>
  );
};
