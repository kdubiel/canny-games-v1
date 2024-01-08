import { Typography } from '@mui/material';
import { ReactNode } from 'react';

type PageTitleProps = {
  children: ReactNode;
};

export const PageTitle = ({ children }: PageTitleProps) => (
  <Typography
    variant="h1"
    align="center"
    color="primary"
    gutterBottom
  >
    {children}
  </Typography>
);
