import Joi from 'joi';
import { SignUpFormFieldValues } from './SignUpForm.types';

export const SignUpFormSchema = Joi.object<SignUpFormFieldValues>().keys({
  nickname: Joi.string().label('Nickname').required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label('Email Address')
    .required(),
  password: Joi.string().label('Password').required(),
});
