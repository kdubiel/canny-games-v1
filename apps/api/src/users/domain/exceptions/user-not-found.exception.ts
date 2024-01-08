import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(query: object) {
    super(`Could not find user with "${query}"`);
  }
}
