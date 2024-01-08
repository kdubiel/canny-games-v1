import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography, styled } from '@mui/material';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import { LogoutButton } from '@/features/auth/components/LogoutButton';

interface StyledTopBarProps extends AppBarProps {
  open?: boolean;
  drawerWidth?: number;
}

export const StyledTopBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledTopBarProps>(({ theme, open, drawerWidth = 240 }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export type TopBarProps = {
  open?: boolean;
  toggleDrawer: () => void;
};

export const TopBar = ({ open, toggleDrawer }: TopBarProps) => {
  return (
    <StyledTopBar
      position="absolute"
      open={open}
    >
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Canny Games
        </Typography>
        <LogoutButton />
      </Toolbar>
    </StyledTopBar>
  );
};
