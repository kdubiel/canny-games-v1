import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { MatchesModule } from '@/matches/matches.module';
import { MatchmakingService } from './application/services/matchmaking.service';
import { MatchmakingGateway } from './infrastructure/api/v1/Matchmaking.gateway';
import { InMemoryMatchmakingRepository } from './infrastructure/in-memory/in-memory-matchmaking.repository';

@Module({
  imports: [CommonModule, MatchesModule],
  providers: [
    InMemoryMatchmakingRepository,
    MatchmakingService,
    MatchmakingGateway,
  ],
  exports: [MatchmakingService],
})
export class MatchmakingModule {}
