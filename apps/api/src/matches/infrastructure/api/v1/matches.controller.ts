import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MatchesService } from '@/matches/application/services/matches.service';
import { GetUser } from '@/shared/decorators/get-user.decorator';
import { JwtUser } from '@/shared/entities/jwt-user.entity';
import { TokenGuard } from '@/shared/guards/token.guard';
import { GetRecentMatchesResponse } from './responses/get-matches.response';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(TokenGuard)
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async me(@GetUser() user: JwtUser): Promise<GetRecentMatchesResponse> {
    const finishedMatches = await this.matchesService.getMatchesResultsByUserId(
      user.userId,
    );

    return GetRecentMatchesResponse.hydrate(finishedMatches);
  }
}
