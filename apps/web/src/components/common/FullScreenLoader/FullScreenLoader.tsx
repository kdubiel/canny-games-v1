import { styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.primary.main,
}));

export const FullScreenLoader = () => (
  <StyledBackdrop open>
    <CircularProgress
      color="inherit"
      size={80}
      thickness={6}
    />
  </StyledBackdrop>
);
