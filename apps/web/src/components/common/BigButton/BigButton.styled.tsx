import { styled, Button } from '@mui/material';

const BigButton = styled(Button)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '20px 40px',
  color: theme.palette.common.white,
  borderRadius: '10px',
}));

export default {
  BigButton,
};
