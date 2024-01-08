import Joi from 'joi';
import { SignInFormFieldValues } from './SignInForm.types';

export const SignInFormSchema = Joi.object<SignInFormFieldValues>().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label('Email Address')
    .required(),
  password: Joi.string().label('Password').required(),
});
