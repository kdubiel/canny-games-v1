import { Typography } from '@mui/material';
import { useAppSelector } from '@/hooks/useAppSelector';

export const PlayerTurn = () => {
  const currentPlayerId = useAppSelector(
    (state) => state.ticTacToe.currentPlayerId,
  );
  const currentUserId = useAppSelector((state) => state.user.user?.userId);

  const isCurrentPlayer = currentUserId === currentPlayerId;

  const winner = useAppSelector((state) => state.ticTacToe.gameState?.winner);

  const renderText = () => {
    if (winner) {
      return 'Game over';
    }

    return isCurrentPlayer ? 'Your turn' : 'Enemy turn';
  };

  return <Typography>{renderText()}</Typography>;
};
