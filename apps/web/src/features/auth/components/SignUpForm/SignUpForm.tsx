import { Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { SignUpFormFieldValues } from './SignUpForm.types';

type SignUpFormProps = {
  disabled?: boolean;
};

export const SignUpForm = ({ disabled }: SignUpFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormFieldValues>();

  return (
    <Stack spacing={1}>
      <Controller
        name="nickname"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Nickname"
            fullWidth
            error={Boolean(errors.nickname)}
            helperText={errors.nickname?.message ?? ' '}
            disabled={disabled}
          />
        )}
      />
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
