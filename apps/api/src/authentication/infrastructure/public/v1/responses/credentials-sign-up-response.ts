import { CredentialsSignUpResponseData } from '@canny-games/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/users/public/dto/user.dto';

export class CredentialsSignUpResponse
  implements CredentialsSignUpResponseData
{
  @ApiProperty()
  id!: string;

  @ApiProperty()
  nickname!: string;

  @ApiProperty()
  email!: string;

  static hydrate(user: UserDto): CredentialsSignUpResponse {
    const response = new CredentialsSignUpResponse();

    response.id = user.id;
    response.email = user.email;
    response.nickname = user.nickname;

    return response;
  }
}
