import Joi from 'joi';

export interface CredentialsSignUpPayload {
  nickname: string;
  email: string;
  password: string;
}

export interface CredentialsSignUpResponseData {
  id: string;
  nickname: string;
  email: string;
}

export const CredentialsSignUpPayloadSchema =
  Joi.object<CredentialsSignUpPayload>().keys({
    nickname: Joi.string().label('Nickname').required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .label('Email Address')
      .required(),
    password: Joi.string().label('Password').required(),
  });
