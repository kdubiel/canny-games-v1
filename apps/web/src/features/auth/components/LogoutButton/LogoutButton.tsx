import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { RouterPaths } from '@/router/paths';
import { useLogoutMutation } from '../../authApi';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const [trigger] = useLogoutMutation();

  const clickHandler = async () => {
    try {
      await trigger();
      navigate(RouterPaths.SignIn, { replace: true });
    } catch (error) {
      // TODO: Error handling
      console.info('LOGOUT ERRROR: ', error);
    }
  };

  return (
    <IconButton onClick={clickHandler}>
      <LogoutIcon />
    </IconButton>
  );
};
