import { FinishedMatch } from '@canny-games/common';
import { ApiProperty } from '@nestjs/swagger';

export class GetRecentMatchesResponse {
  @ApiProperty()
  matches!: FinishedMatch[];

  static hydrate(matches: FinishedMatch[]): GetRecentMatchesResponse {
    const response = new GetRecentMatchesResponse();

    response.matches = matches;

    return response;
  }
}
