import {
  TicTacToeGameStateChangedMessagePayload,
  TicTacToeMessages,
  TicTacToePerformActionMessagePayload,
  checkGameEnded,
  performMove,
} from '@canny-games/common';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MatchesService } from '@/matches/application/services/matches.service';
import { MatchUtilsService } from '@/matches/application/services/match-utils.service';
import { Queues } from '@/shared/queues';
import { TicTacToeGateway } from '../api/v1/tic-tac-toe.gateway';

@Processor(Queues.TicTacToe)
export class TicTacToeProcessor {
  private readonly logger = new Logger(TicTacToeProcessor.name);

  constructor(
    private readonly ticTacToeGateway: TicTacToeGateway,
    private readonly matchesService: MatchesService,
    private readonly matchUtilsService: MatchUtilsService,
  ) {}

  @Process(TicTacToeMessages.PerformAction)
  async handlePlayerAction(
    job: Job<{
      userId: string;
      data: TicTacToePerformActionMessagePayload;
    }>,
  ) {
    try {
      const {
        userId,
        data: {
          matchId,
          playerAction: { row, col },
        },
      } = job.data;

      const matchDto = await this.matchesService.getMatchById(matchId);

      const matchPlayersIds =
        this.matchUtilsService.getPlayersIdsFromDto(matchDto);

      if (!matchPlayersIds.includes(userId)) {
        throw new Error('User is not a player');
      }

      const gameEnded = checkGameEnded({ gameState: matchDto.state });

      if (gameEnded) {
        throw new Error('Game ended');
      }

      const playerSymbol = this.matchUtilsService.getPlayerSymbolByUserId(
        matchDto,
        job.data.userId,
      );

      const currentPlayerSymbol = matchDto.state.currentPlayer;

      if (playerSymbol !== currentPlayerSymbol) {
        throw new Error('Not your turn');
      }

      const newGameState = performMove({
        gameState: matchDto.state,
        row,
        col,
      });

      const newMatchDto = await this.matchesService.updateStateById({
        matchId,
        state: newGameState,
      });

      const currentPlayerId =
        this.matchUtilsService.getCurrentPlayerId(newMatchDto);

      const payload: TicTacToeGameStateChangedMessagePayload = {
        currentPlayerId,
        matchId: matchDto.id,
        state: newGameState,
      };

      await this.ticTacToeGateway.emitToMatch(
        matchDto.id,
        TicTacToeMessages.GameStateChanged,
        payload,
      );
    } catch (error) {
      this.logger.error(`Error processing job ${error}`);
      // TODO: Emit error to user
    }
  }
}
