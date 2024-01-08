import { BadRequestException } from '@nestjs/common';

export class JoiValidationException extends BadRequestException {
  constructor(details: unknown) {
    super({
      message: 'Request validation failed',
      details,
    });
  }
}
