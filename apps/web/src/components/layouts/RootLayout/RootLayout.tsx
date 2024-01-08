import { Box, Container, Toolbar } from '@mui/material';
import { useState } from 'react';
import { TopBar } from '@/components/modules/navigation/TopBar';
import { Sidebar } from '@/components/modules/navigation/Sidebar';
import { LazySuspense } from '@/components/common/LazySuspense';
import S from './RootLayout.styled';

export const RootLayout = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <S.Wrapper>
      <TopBar
        open={open}
        toggleDrawer={toggleDrawer}
      />
      <Sidebar
        open={open}
        toggleDrawer={toggleDrawer}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container
          maxWidth={false}
          sx={{ mt: 4, mb: 4 }}
        >
          <LazySuspense />
        </Container>
      </Box>
    </S.Wrapper>
  );
};
