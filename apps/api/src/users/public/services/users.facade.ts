import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../application/services/users.service';
import { UserByIdQuery } from '../../domain/interfaces/user-by-id-query.type';
import { UserDto } from '../dto/user.dto';
import { UserByEmailQuery } from '../../domain/interfaces/user-by-email-query.type';
import { CreateUserCommand } from '../../domain/interfaces/create-user-command.type';

@Injectable()
export class UsersFacade {
  constructor(private readonly usersService: UsersService) {}

  async getById(query: UserByIdQuery): Promise<UserDto | null> {
    const user = await this.usersService.getByIdOrThrow(query);

    return user.toDto();
  }

  async getByEmail(query: UserByEmailQuery): Promise<UserDto | null> {
    const user = await this.usersService.getByEmailOrThrow(query);

    return user.toDto();
  }

  async create(command: CreateUserCommand): Promise<UserDto> {
    const user = await this.usersService.createOrThrow(command);

    return user.toDto();
  }
}
