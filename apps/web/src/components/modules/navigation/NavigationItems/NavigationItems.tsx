import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Divider } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import { RouterPaths } from '@/router/paths';

export const NavigationItems = () => (
  <>
    <ListItemButton
      component={RouterLink}
      to={RouterPaths.Home}
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>

    <Divider sx={{ my: 1 }} />

    <ListItemButton
      component={RouterLink}
      to={RouterPaths.TicTacToe}
    >
      <ListItemIcon>
        <PlayCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Tic Tac Toe" />
    </ListItemButton>
  </>
);
