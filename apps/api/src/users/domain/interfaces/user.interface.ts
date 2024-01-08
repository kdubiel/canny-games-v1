import { UserDto } from 'src/users/public/dto/user.dto';

export interface User {
  id: string;
  email: string;
  password: string;
  nickname: string;

  toDto(): UserDto;
}
