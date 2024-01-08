import { TicTacToePlayer } from '@canny-games/common';
import { Grid } from '@mui/material';
import { Cell } from '../Cell';

type BoardProps = {
  size: number;
  cells: TicTacToePlayer[][];
  onCellClick: (row: number, col: number) => void;
};

export const Board = ({ cells, onCellClick }: BoardProps) => (
  <Grid
    container
    spacing={1}
  >
    {cells.map((row, rowIndex) => (
      <Grid
        container
        item
        key={rowIndex}
        justifyContent="center"
      >
        {row.map((cell, colIndex) => (
          <Grid
            item
            key={colIndex}
          >
            <Cell
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          </Grid>
        ))}
      </Grid>
    ))}
  </Grid>
);
