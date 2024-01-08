import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/shared/pipes/joi-validation.pipe';
import { CredentialsAuthenticationStrategy } from '../../strategies/credentials-authentication.strategy';
import { CredentialsSignUpRequest } from './requests/credentials-sign-up-request';
import { CredentialsSignUpResponse } from './responses/credentials-sign-up-response';
import { CredentialsSignInRequest } from './requests/credentials-sign-in-request';
import {
  CredentialsSignInPayloadSchema,
  CredentialsSignInResponseData,
  CredentialsSignUpPayloadSchema,
  CredentialsSignUpResponseData,
} from '@canny-games/common';

@Controller('auth')
export class CredentialsAuthenticationController {
  constructor(
    private readonly credentialsAuthenticationStrategy: CredentialsAuthenticationStrategy,
  ) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.NO_CONTENT)
  async login(
    @Body(new JoiValidationPipe(CredentialsSignInPayloadSchema))
    loginRequest: CredentialsSignInRequest,
    @Res({
      passthrough: true,
    })
    res,
  ): Promise<CredentialsSignInResponseData> {
    await this.credentialsAuthenticationStrategy.signIn(loginRequest, res);
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(new JoiValidationPipe(CredentialsSignUpPayloadSchema))
    signUpRequest: CredentialsSignUpRequest,
    @Res({
      passthrough: true,
    })
    res,
  ): Promise<CredentialsSignUpResponseData> {
    const userDto = await this.credentialsAuthenticationStrategy.signUp(
      signUpRequest,
      res,
    );

    return CredentialsSignUpResponse.hydrate(userDto);
  }
}
