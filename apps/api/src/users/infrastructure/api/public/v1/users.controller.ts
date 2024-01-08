import { JwtUser } from '@/shared/entities/jwt-user.entity';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { TokenGuard } from 'src/shared/guards/token.guard';
import { UsersFacade } from 'src/users/public/services/users.facade';
import { GetAuthenticatedUserResponse } from './responses/get-authenticated-user.response';
import { AuthenticatedUser } from '@canny-games/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersFacade: UsersFacade) {}

  @UseGuards(TokenGuard)
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async me(@GetUser() user: JwtUser): Promise<AuthenticatedUser> {
    const userDto = await this.usersFacade.getById({
      id: user.userId,
    });

    return GetAuthenticatedUserResponse.hydrate(userDto);
  }
}
