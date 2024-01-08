import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RouterPaths } from '@/router/paths';
import { useCredentialsSignInMutation } from '../../authApi';
import { SignInFormFieldValues } from './SignInForm.types';
import { SignInForm } from './SignInForm';
import { SignInFormSchema } from './SignInForm.schema';
import { signInFormDefaultValues } from './SignInForm.constants';

export const SignInFormContainer = () => {
  const navigate = useNavigate();

  const form = useForm<SignInFormFieldValues>({
    resolver: joiResolver(SignInFormSchema),
    defaultValues: signInFormDefaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit } = form;

  const [trigger, { isSuccess, isLoading }] = useCredentialsSignInMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(RouterPaths.Home);
    }
  }, [isLoading, isSuccess, navigate]);

  const handleSignIn: SubmitHandler<SignInFormFieldValues> = async (data) => {
    try {
      await trigger(data);
    } catch (error) {
      // TODO: Error handling
      console.info('SIGN IN ERRROR: ', error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={handleSubmit(handleSignIn)}
      >
        <SignInForm />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
};
