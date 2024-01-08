import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MatchOrmEntity } from './matches/infrastructure/orm/entities/match.orm.entity';
import config, { AppConfig } from './shared/config/config';
import { UserEntity } from './users/infrastructure/orm/entities/user.entity';

const configService = new ConfigService(config());

const { dbName, url } = configService.get<AppConfig>('mongo', {
  infer: true,
});

const MikroOrmConfig: MikroOrmModuleSyncOptions = {
  dbName: dbName || 'canny-games',
  type: 'mongo',
  clientUrl: url || 'mongodb://localhost:27017',
  entities: [UserEntity, MatchOrmEntity],
  migrations: {
    tableName: 'migrations',
    transactional: true,
    allOrNothing: true,
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    snapshot: true,
  },
  ensureIndexes: true,
  ensureDatabase: true,
  validate: true,
  scope: Scope.REQUEST,
  registerRequestContext: false,
  allowGlobalContext: true,
};

export default MikroOrmConfig;
