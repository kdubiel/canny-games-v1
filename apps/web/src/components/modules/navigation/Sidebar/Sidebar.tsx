import { Divider, IconButton, List, Toolbar, styled } from '@mui/material';
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { NavigationItems } from '../NavigationItems';

export type StyledDrawerProps = DrawerProps & {
  drawerWidth?: number;
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<StyledDrawerProps>(({ theme, open, drawerWidth = 240 }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

type SidebarProps = {
  open?: boolean;
  toggleDrawer: () => void;
};

export const Sidebar = ({ open, toggleDrawer }: SidebarProps) => {
  return (
    <Drawer
      variant="permanent"
      open={open}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <NavigationItems />
      </List>
    </Drawer>
  );
};
