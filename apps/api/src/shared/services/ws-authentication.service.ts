import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/shared/config/config';
import { InvalidTokenException } from '../exceptions/invalid-token.exception';
import { JwtUser } from '../typings/jwt-user.interface';
import { JwtPayload, isJwtPayload } from '../typings/jwt-payload.interface';
import { ConnectedSockets } from '../typings/connected-sockets.type';
import type { Socket } from 'socket.io/dist/socket';

@Injectable()
export class WsAuthenticationService {
  private readonly logger = new Logger(WsAuthenticationService.name);

  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserRequest(socket: Socket): Promise<JwtUser> {
    try {
      const {
        data: { user },
      } = await this.decodeAccessTokenFromClientOrThrow(socket);

      return user;
    } catch (error) {
      throw new InvalidTokenException();
    }
  }

  async decodeAccessTokenFromClientOrThrow(
    client: Socket,
  ): Promise<JwtPayload> {
    const { accessTokenSecret } = this.configService.get('jwt', {
      infer: true,
    });

    const accessToken = this.extractAccessTokenFromClient(client);

    if (!accessToken) {
      throw new InvalidTokenException();
    }

    const jwtPayload = await this.jwtService.verifyAsync<JwtPayload>(
      accessToken,
      {
        secret: accessTokenSecret,
      },
    );

    if (!isJwtPayload(jwtPayload)) {
      throw new InvalidTokenException();
    }

    return jwtPayload;
  }

  async decodeAccessTokenFromClient(client: Socket) {
    try {
      const accessToken = this.extractAccessTokenFromClient(client);

      if (!accessToken) {
        throw new InvalidTokenException();
      }

      const jwtPayload = await this.jwtService.decode<JwtPayload>(accessToken);

      if (!isJwtPayload(jwtPayload)) {
        throw new InvalidTokenException();
      }

      return jwtPayload;
    } catch (error) {}
  }

  async validateUserAndPushToConnectedSockets(
    client: Socket,
    connectedSockets: ConnectedSockets,
  ) {
    try {
      const { userId } = await this.validateUserRequest(client);

      if (!connectedSockets[userId]) connectedSockets[userId] = [];
      connectedSockets[userId].push(client);

      this.logger.debug(
        `User ${userId} connected to Websockets client ${client.id}`,
      );
    } catch (error) {
      // TODO: Improve logs
      client.disconnect();
      this.logger.debug(`Client ${client.id} disconnected`);
    }
  }

  async validateUserAndRemoveFromConnectedSockets(
    client: Socket,
    connectedSockets: ConnectedSockets,
  ) {
    try {
      const jwtPayload = await this.decodeAccessTokenFromClient(client);

      const {
        data: {
          user: { userId },
        },
      } = jwtPayload;

      connectedSockets[userId] = connectedSockets[userId].filter(
        (p) => p.id !== client.id,
      );

      this.logger.debug(
        `User ${userId} disconnected from Websockets client ${client.id} `,
      );

      return userId;
    } catch (error) {
      this.logger.error(`Error disconnecting client ${client.id}`, error);
    }
  }

  private extractAccessTokenFromClient(client: Socket): string {
    const { accessTokenCookieName } = this.configService.get('jwt', {
      infer: true,
    });

    const accessToken = client.handshake.headers.cookie
      .split('; ')
      .find((cookie: string) => cookie.startsWith(accessTokenCookieName))
      .split('=')[1];

    return accessToken;
  }
}
