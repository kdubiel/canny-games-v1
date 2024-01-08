import { Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RouterPaths } from '@/router/paths';
import { AuthFormWrapper } from './components/AuthFormWrapper';
import { SignUpFormContainer } from './components/SignUpForm/SignUpFormContainer';

export const SignUpPage = () => (
  <AuthFormWrapper title="Sign Up">
    <SignUpFormContainer />
    <Grid
      container
      justifyContent="flex-end"
    >
      <Grid item>
        <Link
          component={RouterLink}
          to={RouterPaths.SignIn}
          variant="body2"
        >
          Already have an account? Sign in
        </Link>
      </Grid>
    </Grid>
  </AuthFormWrapper>
);
