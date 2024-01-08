import { Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RouterPaths } from '@/router/paths';
import { AuthFormWrapper } from './components/AuthFormWrapper';
import { SignInFormContainer } from './components/SignInForm/SignInFormContainer';

export const SignInPage = () => (
  <AuthFormWrapper title="Sign In">
    <SignInFormContainer />
    <Grid
      container
      justifyContent="flex-end"
    >
      <Grid item>
        <Link
          component={RouterLink}
          to={RouterPaths.SignUp}
          variant="body2"
        >
          Sign up
        </Link>
      </Grid>
    </Grid>
  </AuthFormWrapper>
);
