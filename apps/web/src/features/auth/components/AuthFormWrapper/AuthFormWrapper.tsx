import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';

type AuthFormWrapperProps = {
  title: string;
  children: ReactNode;
};

export const AuthFormWrapper = ({ children, title }: AuthFormWrapperProps) => (
  <Container maxWidth="sm">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        component="h1"
        variant="h5"
      >
        {title}
      </Typography>
      <Box sx={{ mt: 2, width: '100%' }}>{children}</Box>
    </Box>
  </Container>
);
