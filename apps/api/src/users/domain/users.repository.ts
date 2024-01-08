import { CreateUserCommand } from './interfaces/create-user-command.type';
import { UserByEmailQuery } from './interfaces/user-by-email-query.type';
import { UserByIdQuery } from './interfaces/user-by-id-query.type';
import { User } from './interfaces/user.interface';

export abstract class UsersRepository {
  abstract getByEmail(query: UserByEmailQuery): Promise<User | null>;
  abstract getById(query: UserByIdQuery): Promise<User | null>;
  abstract create(command: CreateUserCommand): Promise<User | null>;
}
