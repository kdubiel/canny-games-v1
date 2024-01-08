import { Injectable } from '@nestjs/common';

import { TicTacToePlayer } from '@canny-games/common';
import { MatchDto } from '@/matches/public/dto/match.dto';

@Injectable()
export class MatchUtilsService {
  constructor() {}

  getPlayersIdsFromDto(matchDto: MatchDto): string[] {
    const { playerO, playerX } = matchDto;

    return [playerO, playerX];
  }

  getPlayerSymbolByUserId(matchDto: MatchDto, userId: string): TicTacToePlayer {
    const { playerO, playerX } = matchDto;

    if (playerO === userId) {
      return TicTacToePlayer.O;
    }

    if (playerX === userId) {
      return TicTacToePlayer.X;
    }

    return null;
  }

  getCurrentPlayerId(matchDto: MatchDto): string {
    const currentPlayerSymbol = matchDto.state.currentPlayer;

    const { playerO, playerX } = matchDto;

    return currentPlayerSymbol === TicTacToePlayer.O ? playerO : playerX;
  }
}
