import { styled } from '@mui/material';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(12),
}));

export default {
  Wrapper,
};
