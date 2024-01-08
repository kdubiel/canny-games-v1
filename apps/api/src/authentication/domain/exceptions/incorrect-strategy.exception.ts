import { InternalServerErrorException } from '@nestjs/common';

export class IncorrectStrategyException extends InternalServerErrorException {
  constructor(strategy: unknown) {
    super(`Incorrect strategy "${strategy}"`);
  }
}
