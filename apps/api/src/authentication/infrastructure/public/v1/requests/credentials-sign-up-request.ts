import { ApiProperty } from '@nestjs/swagger';
import { CredentialsSignUpPayload } from '@canny-games/common';

export class CredentialsSignUpRequest implements CredentialsSignUpPayload {
  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
