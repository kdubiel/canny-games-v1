import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  AuthenticationStrategies,
  AuthenticationStrategy,
} from 'src/authentication/domain/authentication.strategy';
import { InvalidCredentialsException } from 'src/authentication/domain/exceptions/invalid-credentials.exception';
import { CredentialsLoginCommand } from 'src/authentication/domain/interfaces/credentials-login-command.type';
import { CredentialsRegisterCommand } from 'src/authentication/domain/interfaces/credentials-register-command.type';
import { UserDto } from 'src/users/public/dto/user.dto';
import { UsersFacade } from 'src/users/public/services/users.facade';
import { RequestAuthenticationService } from 'src/shared/services/request-authentication.service';
import { JwtUser } from '@/shared/entities/jwt-user.entity';
import type { Request, Response } from 'express';

@Injectable()
export class CredentialsAuthenticationStrategy extends AuthenticationStrategy {
  strategy = AuthenticationStrategies.Credentials;

  private readonly logger = new Logger(CredentialsAuthenticationStrategy.name);

  constructor(
    private readonly requestAuthenticationService: RequestAuthenticationService,
    private readonly usersFacade: UsersFacade,
  ) {
    super();
  }

  async logout(_req: Request, res: Response): Promise<void> {
    await this.requestAuthenticationService.logout(res);
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    await this.requestAuthenticationService.refreshTokens(res, req);
  }

  async signIn(command: CredentialsLoginCommand, res: Response): Promise<void> {
    try {
      const userDto = await this.usersFacade.getByEmail({
        email: command.email,
      });

      this.validateUserCredentials(command, userDto);

      await this.requestAuthenticationService.setAuthTokens(res, {
        data: { authStrategy: this.strategy, user: JwtUser.fromDto(userDto) },
      });

      this.logger.debug(
        `User ${userDto.id} signed in using ${this.strategy} strategy`,
      );
    } catch (error) {
      throw new InvalidCredentialsException();
    }
  }

  async signUp(
    command: CredentialsRegisterCommand,
    res: Response,
  ): Promise<UserDto> {
    try {
      const userDto = await this.usersFacade.create({
        email: command.email,
        password: command.password,
        nickname: command.nickname,
      });

      await this.requestAuthenticationService.setAuthTokens(res, {
        data: { authStrategy: this.strategy, user: JwtUser.fromDto(userDto) },
      });

      this.logger.debug(
        `User ${userDto.id} signed up using ${this.strategy} strategy`,
      );

      return userDto;
    } catch (error) {
      throw new InvalidCredentialsException();
    }
  }

  private validateUserCredentials(
    command: CredentialsLoginCommand,
    user: UserDto,
  ) {
    if (!bcrypt.compare(command.password, user.password)) {
      throw new InvalidCredentialsException();
    }
  }
}
