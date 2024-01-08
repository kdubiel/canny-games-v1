import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersService } from './application/services/users.service';
import { UsersOrmModule } from './infrastructure/orm/users-orm.module';
import { UsersFacade } from './public/services/users.facade';
import { UsersController } from './infrastructure/api/public/v1/users.controller';

@Module({
  imports: [UsersOrmModule, CommonModule],
  controllers: [UsersController],
  providers: [UsersService, UsersFacade],
  exports: [UsersFacade],
})
export class UsersModule {}
