import { CredentialsSignInPayload } from '@canny-games/common';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsSignInRequest implements CredentialsSignInPayload {
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;
}
