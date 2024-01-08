import { Paper, styled } from '@mui/material';

const GamePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default {
  GamePaper,
};
