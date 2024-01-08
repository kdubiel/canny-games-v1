import { BeforeCreate, Entity, Property, Unique } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { CustomBaseEntity } from '@/shared/entities/custom-base.entity';
import { User } from 'src/users/domain/interfaces/user.interface';
import { UserDto } from 'src/users/public/dto/user.dto';
import { HASH_ROUNDS } from 'src/shared/constants';

@Entity({
  collection: 'users',
})
export class UserEntity extends CustomBaseEntity implements User {
  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;

  @Property()
  @Unique()
  nickname!: string;

  toDto(): UserDto {
    return {
      id: this.id,
      email: this.email,
      nickname: this.nickname,
      password: this.password,
    };
  }

  @BeforeCreate()
  async _hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, HASH_ROUNDS);
  }
}
