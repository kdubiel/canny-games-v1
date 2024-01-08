import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { InjectToken } from 'src/shared/injectToken';
import { MatchesOrmRepository } from './services/matches.orm.repository';
import { MatchOrmEntity } from './entities/match.orm.entity';

@Module({
  imports: [MikroOrmModule.forFeature([MatchOrmEntity])],
  providers: [
    {
      provide: InjectToken.MatchesRepository,
      useClass: MatchesOrmRepository,
    },
  ],
  exports: [InjectToken.MatchesRepository],
})
export class MatchesOrmModule {}
