import { MatchResult } from './match-result.enum';

export interface FinishedMatch {
  startedAt: Date;
  matchResult: MatchResult;
}
