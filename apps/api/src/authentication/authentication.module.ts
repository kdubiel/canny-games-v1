import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationStrategyFactory } from './application/authentication-strategy.factory';
import { CommonAuthenticationController } from './infrastructure/public/v1/common-authentication.controller';
import { CredentialsAuthenticationController } from './infrastructure/public/v1/credentials-authentication.controller';
import { CredentialsAuthenticationStrategy } from './infrastructure/strategies/credentials-authentication.strategy';

@Module({
  imports: [CommonModule, UsersModule],
  providers: [AuthenticationStrategyFactory, CredentialsAuthenticationStrategy],
  controllers: [
    CommonAuthenticationController,
    CredentialsAuthenticationController,
  ],
})
export class AuthenticationModule {}
