import Joi from 'joi';

export interface CredentialsSignInPayload {
  email: string;
  password: string;
}

export type CredentialsSignInResponseData = void;

export const CredentialsSignInPayloadSchema =
  Joi.object<CredentialsSignInPayload>().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label('Email Address')
      .required(),
    password: Joi.string().label('Password').required(),
  });
