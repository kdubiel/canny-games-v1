import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { Queues } from '@/shared/queues';
import { CommonModule } from '@/common/common.module';
import { MatchesModule } from '@/matches/matches.module';
import { TicTacToeGateway } from './infrastructure/api/v1/tic-tac-toe.gateway';
import { TicTacToeProcessor } from './infrastructure/processors/tic-tac-toe.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: Queues.TicTacToe,
    }),
    CommonModule,
    MatchesModule,
  ],
  providers: [TicTacToeGateway, TicTacToeProcessor],
  exports: [TicTacToeGateway],
})
export class TicTacToeModule {}
