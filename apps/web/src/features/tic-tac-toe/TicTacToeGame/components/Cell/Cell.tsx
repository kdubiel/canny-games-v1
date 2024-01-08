import { TicTacToePlayer } from '@canny-games/common';
import { styled } from '@mui/material';

type CellProps = {
  value: TicTacToePlayer;
  onClick: () => void;
};

const StyledCell = styled('div')(({ theme }) => ({
  width: '50px',
  height: '50px',
  lineHeight: '50px',
  textAlign: 'center',
  border: '1px solid #ccc',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const Cell = ({ value, onClick }: CellProps) => {
  return <StyledCell onClick={onClick}>{value}</StyledCell>;
};
