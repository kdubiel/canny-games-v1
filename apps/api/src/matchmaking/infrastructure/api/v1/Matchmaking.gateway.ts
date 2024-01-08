import {
  TicTacToeGameStateChangedMessagePayload,
  TicTacToeMessages,
} from '@canny-games/common';
import { Logger, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchUtilsService } from '@/matches/application/services/match-utils.service';
import { MatchmakingService } from 'src/matchmaking/application/services/matchmaking.service';
import { GetWsUser } from 'src/shared/decorators/get-ws-user.decorator';
import { AllWsExceptionsFilter } from 'src/shared/exception-filters';
import { WsJwtGuard } from 'src/shared/guards/ws-token.guard';
import { WsAcknowledgementInterceptor } from 'src/shared/interceptors/ws-acknowledgement.interceptor';
import { AuthenticatedWebSocketGateway } from 'src/shared/services/authenticated-web-socket.gateway';
import { WsAuthenticationService } from 'src/shared/services/ws-authentication.service';

const WS_NAMESPACE = 'matchmaking';

@UseFilters(AllWsExceptionsFilter)
@WebSocketGateway({
  namespace: WS_NAMESPACE,
  transports: ['websocket'],
})
export class MatchmakingGateway extends AuthenticatedWebSocketGateway {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(MatchmakingGateway.name);

  constructor(
    protected readonly wsAuthenticationService: WsAuthenticationService,
    private readonly matchmakingService: MatchmakingService,
    private readonly matchUtilsService: MatchUtilsService,
  ) {
    super(wsAuthenticationService);
  }

  async handleDisconnect(client: Socket) {
    const userId =
      await this.wsAuthenticationService.validateUserAndRemoveFromConnectedSockets(
        client,
        this.connectedSockets,
      );

    await this.matchmakingService.leaveMatchmaking(userId);
  }

  @UseGuards(WsJwtGuard)
  @UseInterceptors(WsAcknowledgementInterceptor)
  @SubscribeMessage(TicTacToeMessages.MatchmakingJoin)
  async matchmakingJoin(@GetWsUser() user) {
    const { userId } = user;

    await this.matchmakingService.joinMatchmaking(userId);

    const enemyUserId = await this.matchmakingService.findEnemy(userId);

    if (!enemyUserId) return;

    if (this.connectedSockets[enemyUserId]) {
      const newGame = await this.startGame(userId, enemyUserId);

      const payload: TicTacToeGameStateChangedMessagePayload = {
        matchId: newGame.id,
        state: newGame.state,
        currentPlayerId: this.matchUtilsService.getCurrentPlayerId(newGame),
      };
      this.emitToUser(userId, TicTacToeMessages.GameStateChanged, payload);
      this.emitToUser(enemyUserId, TicTacToeMessages.GameStateChanged, payload);
    } else {
      await this.matchmakingService.leaveMatchmaking(enemyUserId);
    }
  }

  @UseGuards(WsJwtGuard)
  @UseInterceptors(WsAcknowledgementInterceptor)
  @SubscribeMessage(TicTacToeMessages.MatchmakingCancel)
  async matchmakingCancel(@GetWsUser() user) {
    const { userId } = user;

    await this.matchmakingService.leaveMatchmaking(userId);
  }

  emitToUser(userId: string, event: string, data: any) {
    this.connectedSockets[userId].forEach((socket) => {
      socket.emit(event, data);
    });
  }

  // TODO: Move to queue
  private async startGame(userId: string, enemyId: string) {
    const newGame = await this.matchmakingService.startGame(userId, enemyId);
    return newGame;
  }
}
