import { Injectable } from '@nestjs/common';
import {
  AuthenticationStrategies,
  AuthenticationStrategy,
} from '../domain/authentication.strategy';
import { IncorrectStrategyException } from '../domain/exceptions/incorrect-strategy.exception';
import { CredentialsAuthenticationStrategy } from '../infrastructure/strategies/credentials-authentication.strategy';

@Injectable()
export class AuthenticationStrategyFactory {
  constructor(
    private readonly credentialsAuthenticationStrategy: CredentialsAuthenticationStrategy,
  ) {}

  getStrategy(strategy?: AuthenticationStrategies): AuthenticationStrategy {
    switch (strategy) {
      case AuthenticationStrategies.Credentials:
        return this.credentialsAuthenticationStrategy;
      default:
        throw new IncorrectStrategyException(strategy);
    }
  }
}
