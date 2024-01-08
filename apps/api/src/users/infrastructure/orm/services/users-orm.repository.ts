import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/domain/users.repository';
import { UserByEmailQuery } from 'src/users/domain/interfaces/user-by-email-query.type';
import { UserByIdQuery } from 'src/users/domain/interfaces/user-by-id-query.type';
import { CreateUserCommand } from 'src/users/domain/interfaces/create-user-command.type';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersOrmRepository extends UsersRepository {
  constructor(private readonly em: EntityManager) {
    super();
  }

  async getByEmail(query: UserByEmailQuery): Promise<UserEntity | null> {
    const user = await this.em.findOne(UserEntity, query);

    return user;
  }

  async getById(query: UserByIdQuery): Promise<UserEntity | null> {
    const user = await this.em.findOne(UserEntity, query);

    return user;
  }

  async create(command: CreateUserCommand): Promise<UserEntity | null> {
    const newUser = await this.em.create(UserEntity, command);

    await this.em.persistAndFlush(newUser);

    return newUser;
  }
}
