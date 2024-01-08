import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestAuthenticationService } from '../services/request-authentication.service';
import { InvalidTokenException } from '../exceptions/invalid-token.exception';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly requestAuthenticationService: RequestAuthenticationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const httpHost = context.switchToHttp();

      const request = httpHost.getRequest();

      const user = await this.requestAuthenticationService.validateUserRequest(
        request,
      );

      // TODO: Improve type safety
      httpHost.getRequest().user = user;

      return Boolean(user);
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}
