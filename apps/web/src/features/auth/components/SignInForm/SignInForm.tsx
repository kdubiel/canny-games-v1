import { Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { SignInFormFieldValues } from './SignInForm.types';

type SignInFormProps = {
  disabled?: boolean;
};

export const SignInForm = ({ disabled }: SignInFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignInFormFieldValues>();

  return (
    <Stack spacing={1}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Email Address"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email?.message ?? ' '}
            disabled={disabled}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Password"
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password?.message ?? ' '}
            disabled={disabled}
          />
        )}
      />
    </Stack>
  );
};
