import { Lobby } from './Lobby';
import { MatchmakingSocket } from './MatchmakingSocket/MatchmakingSocket';

export const Matchmaking = () => (
  <MatchmakingSocket>
    <Lobby />
  </MatchmakingSocket>
);
