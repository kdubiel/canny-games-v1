import { InjectQueue } from '@nestjs/bull';
import { Logger, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Queue } from 'bull';
import { Server, Socket } from 'socket.io';
import {
  TicTacToeMessages,
  TicTacToePerformActionMessagePayload,
} from '@canny-games/common';
import { JwtUser } from '@/shared/entities/jwt-user.entity';
import { GetWsUser } from 'src/shared/decorators/get-ws-user.decorator';
import { AllWsExceptionsFilter } from 'src/shared/exception-filters';
import { WsJwtGuard } from 'src/shared/guards/ws-token.guard';
import { WsAcknowledgementInterceptor } from 'src/shared/interceptors/ws-acknowledgement.interceptor';
import { Queues } from 'src/shared/queues';
import { AuthenticatedWebSocketGateway } from 'src/shared/services/authenticated-web-socket.gateway';
import { WsAuthenticationService } from 'src/shared/services/ws-authentication.service';
import { MatchesService } from '@/matches/application/services/matches.service';

const WS_NAMESPACE = 'tic-tac-toe';

@UseFilters(AllWsExceptionsFilter)
@WebSocketGateway({
  namespace: WS_NAMESPACE,
  transports: ['websocket'],
})
export class TicTacToeGateway extends AuthenticatedWebSocketGateway {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(TicTacToeGateway.name);

  constructor(
    @InjectQueue(Queues.TicTacToe) private readonly ticTacToeQueue: Queue,
    protected readonly wsAuthenticationService: WsAuthenticationService,
    private readonly matchesService: MatchesService,
  ) {
    super(wsAuthenticationService);
  }

  @UseGuards(WsJwtGuard)
  @UseInterceptors(WsAcknowledgementInterceptor)
  @SubscribeMessage(TicTacToeMessages.PerformAction)
  async handleMessage(
    @GetWsUser() user: JwtUser,
    @ConnectedSocket() client: Socket,
    @MessageBody() playerAction: TicTacToePerformActionMessagePayload,
  ) {
    const { userId } = user;

    this.logger.log(
      `Message received from client id: ${
        client.id
      } in ${WS_NAMESPACE}: ${JSON.stringify(playerAction)}`,
    );
    await this.ticTacToeQueue.add(TicTacToeMessages.PerformAction, {
      userId,
      data: playerAction,
    });
  }

  emitToUser(userId: string, event: string, data: any) {
    this.logger.log(
      `Emitting event ${event} to user ${userId} in ${WS_NAMESPACE}`,
    );
    this.connectedSockets[userId].forEach((socket) => {
      socket.emit(event, data);
    });
  }

  // TODO: Implement websockets rooms
  async emitToMatch(matchId: string, event: string, data: any) {
    try {
      this.logger.log(`Emitting event ${event} to match ${matchId}`);

      const playersIds = await this.matchesService.getPlayersIdsByMatchId(
        matchId,
      );
      playersIds.forEach((playerId) => {
        this.emitToUser(playerId, event, data);
      });
    } catch (error) {
      this.logger.error(`Could not emit event to match ${matchId} ${error}`);
    }
  }
}
