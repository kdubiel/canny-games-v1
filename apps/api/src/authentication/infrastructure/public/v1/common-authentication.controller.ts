import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticationStrategyFactory } from 'src/authentication/application/authentication-strategy.factory';
import { RequestAuthenticationService } from 'src/shared/services/request-authentication.service';

@Controller('auth')
export class CommonAuthenticationController {
  private readonly logger = new Logger(CommonAuthenticationController.name);

  constructor(
    private readonly authenticationStrategyFactory: AuthenticationStrategyFactory,
    private readonly requestAuthenticationService: RequestAuthenticationService,
  ) {}

  @Post('/logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req, @Res({ passthrough: true }) res): Promise<void> {
    const jwtPayload =
      await this.requestAuthenticationService.decodeRefreshTokenFromRequest(
        req,
      );

    const authenticationStrategy =
      await this.authenticationStrategyFactory.getStrategy(
        jwtPayload.data.authStrategy,
      );

    await authenticationStrategy.logout(req, res);

    this.logger.debug(
      `User ${jwtPayload.data.user.userId} logged out from ${jwtPayload.data.authStrategy} strategy`,
    );
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async refreshToken(@Req() req, @Res({ passthrough: true }) res) {
    const jwtPayload =
      await this.requestAuthenticationService.decodeRefreshTokenFromRequest(
        req,
      );

    const authenticationStrategy =
      await this.authenticationStrategyFactory.getStrategy(
        jwtPayload.data.authStrategy,
      );

    await authenticationStrategy.refreshToken(req, res);

    this.logger.debug(
      `User ${jwtPayload.data.user.userId} refreshed tokens with ${jwtPayload.data.authStrategy} strategy`,
    );
  }
}
