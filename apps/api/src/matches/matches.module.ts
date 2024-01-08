import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { MatchesOrmModule } from './infrastructure/orm/matches.orm.module';
import { MatchesService } from './application/services/matches.service';
import { MatchUtilsService } from './application/services/match-utils.service';
import { MatchesController } from './infrastructure/api/v1/matches.controller';

@Module({
  imports: [CommonModule, UsersModule, MatchesOrmModule],
  providers: [MatchesService, MatchUtilsService],
  controllers: [MatchesController],
  exports: [MatchesService, MatchUtilsService],
})
export class MatchesModule {}
