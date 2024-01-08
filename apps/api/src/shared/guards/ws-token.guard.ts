import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsArgumentsHost } from '@nestjs/common/interfaces';
import { Socket } from 'socket.io';
import { WsAuthenticationService } from '../services/ws-authentication.service';
import { InvalidTokenException } from '../exceptions/invalid-token.exception';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly wsAuthenticationService: WsAuthenticationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const wsHost: WsArgumentsHost = context.switchToWs();

      const client: Socket = wsHost.getClient<Socket>();

      const user = await this.wsAuthenticationService.validateUserRequest(
        client,
      );

      // Improve types
      context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (err) {
      throw new InvalidTokenException();
    }
  }
}
