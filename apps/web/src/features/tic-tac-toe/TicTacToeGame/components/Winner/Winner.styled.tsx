import { styled } from '@mui/material';

const WinnerMessage = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
}));

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  gap: theme.spacing(4),
}));

export default {
  WinnerMessage,
  Wrapper,
};
