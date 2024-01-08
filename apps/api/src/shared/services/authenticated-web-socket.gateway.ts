import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsAuthenticationService } from 'src/shared/services/ws-authentication.service';
import { ConnectedSockets } from 'src/shared/typings/connected-sockets.type';

export abstract class AuthenticatedWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  connectedSockets: ConnectedSockets = {};

  constructor(
    protected readonly wsAuthenticationService: WsAuthenticationService,
  ) {}

  async handleConnection(client: Socket) {
    await this.wsAuthenticationService.validateUserAndPushToConnectedSockets(
      client,
      this.connectedSockets,
    );
  }

  async handleDisconnect(client: Socket) {
    await this.wsAuthenticationService.validateUserAndRemoveFromConnectedSockets(
      client,
      this.connectedSockets,
    );
  }
}
