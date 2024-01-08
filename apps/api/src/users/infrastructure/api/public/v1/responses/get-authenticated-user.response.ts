import { AuthenticatedUser } from '@canny-games/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/public/dto/user.dto';

export class GetAuthenticatedUserResponse implements AuthenticatedUser {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  nickname!: string;

  @ApiProperty()
  email!: string;

  static hydrate(user: UserDto): GetAuthenticatedUserResponse {
    const response = new GetAuthenticatedUserResponse();

    response.userId = user.id;
    response.email = user.email;
    response.nickname = user.nickname;

    return response;
  }
}
