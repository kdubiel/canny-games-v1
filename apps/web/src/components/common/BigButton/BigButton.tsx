import { ButtonProps } from '@mui/material';
import S from './BigButton.styled';

type BigButtonProps = ButtonProps;

export const BigButton = (props: BigButtonProps) => (
  <S.BigButton
    variant="contained"
    {...props}
  />
);
