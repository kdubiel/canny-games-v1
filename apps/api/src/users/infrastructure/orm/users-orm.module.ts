import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { InjectToken } from 'src/shared/injectToken';
import { UserEntity } from './entities/user.entity';
import { UsersOrmRepository } from './services/users-orm.repository';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: InjectToken.UsersRepository, useClass: UsersOrmRepository },
  ],
  exports: [InjectToken.UsersRepository],
})
export class UsersOrmModule {}
