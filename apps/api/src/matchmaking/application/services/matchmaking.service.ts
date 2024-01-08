import { Injectable, Logger } from '@nestjs/common';
import { MatchesService } from '@/matches/application/services/matches.service';
import { InMemoryMatchmakingRepository } from 'src/matchmaking/infrastructure/in-memory/in-memory-matchmaking.repository';

@Injectable()
export class MatchmakingService {
  private readonly logger = new Logger(MatchmakingService.name);

  constructor(
    private readonly matchmakingRepository: InMemoryMatchmakingRepository,
    private readonly gameStateService: MatchesService,
  ) {}

  async joinMatchmaking(userId: string) {
    await this.matchmakingRepository.addUser(userId);

    this.logger.log(`User ${userId} joined matchmaking`);
  }

  async leaveMatchmaking(userId: string) {
    await this.matchmakingRepository.removeUserById(userId);

    this.logger.log(`User ${userId} left matchmaking`);
  }

  async findEnemy(userId: string) {
    const users = await this.matchmakingRepository.getUsers();

    const enemy = users.find((u) => u.id !== userId);

    if (enemy) {
      this.logger.log(`User ${userId} found enemy ${enemy?.id}`);
    }

    return enemy?.id || null;
  }

  async startGame(userId: string, enemyId: string) {
    const game = await this.gameStateService.createMatch({
      playerXId: userId,
      playerOId: enemyId,
      boardSize: 3,
      winningCondition: 3,
    });

    this.logger.log(`Game ${game.id} started`);

    return game;
  }
}
