import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from '@/router/paths';
import { useCredentialsSignUpMutation } from '../../authApi';
import { SignUpFormFieldValues } from './SignUpForm.types';
import { SignUpForm } from './SignUpForm';
import { SignUpFormSchema } from './SignUpForm.schema';
import { signUpFormDefaultValues } from './SignUpForm.constants';

export const SignUpFormContainer = () => {
  const navigate = useNavigate();

  const form = useForm<SignUpFormFieldValues>({
    resolver: joiResolver(SignUpFormSchema),
    defaultValues: signUpFormDefaultValues,
    mode: 'onBlur',
  });

  const { handleSubmit } = form;

  const [trigger] = useCredentialsSignUpMutation();

  const handleSignIn: SubmitHandler<SignUpFormFieldValues> = async (data) => {
    try {
      await trigger(data);
      navigate(RouterPaths.Home, { replace: true });
    } catch (error) {
      // TODO: Error handling
      console.info('SIGN UP ERRROR: ', error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={handleSubmit(handleSignIn)}
      >
        <SignUpForm />
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
