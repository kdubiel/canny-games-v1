import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectToken } from 'src/shared/injectToken';
import { UserNotFoundException } from 'src/users/domain/exceptions/user-not-found.exception';
import { CreateUserCommand } from 'src/users/domain/interfaces/create-user-command.type';
import { UserByEmailQuery } from 'src/users/domain/interfaces/user-by-email-query.type';
import { UserByIdQuery } from 'src/users/domain/interfaces/user-by-id-query.type';
import { User } from 'src/users/domain/interfaces/user.interface';
import { UsersRepository } from 'src/users/domain/users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(InjectToken.UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {}

  async getByEmailOrThrow(query: UserByEmailQuery): Promise<User> {
    const user = await this.userRepository.getByEmail(query);

    if (!user) {
      throw new UserNotFoundException(query);
    }

    return user;
  }

  async getByIdOrThrow(query: UserByIdQuery): Promise<User> {
    const user = await this.userRepository.getById(query);

    if (!user) {
      throw new UserNotFoundException(query);
    }

    return user;
  }

  async createOrThrow(command: CreateUserCommand): Promise<User> {
    const newUser = await this.userRepository.create(command);

    if (!newUser) {
      throw new InternalServerErrorException(
        `User ${command.email} not created`,
      );
    }

    return newUser;
  }
}
