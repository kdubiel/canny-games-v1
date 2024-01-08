import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/public/dto/user.dto';

export class JwtUser {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  static fromDto(userDto: UserDto): JwtUser {
    const jwtUser = new JwtUser();

    jwtUser.userId = userDto.id;
    jwtUser.email = userDto.email;
    jwtUser.nickname = userDto.nickname;

    return jwtUser;
  }
}
