import { useState } from 'react';
import { BigButton } from '@/components/common/BigButton';
import { MatchmakingStopwatch } from '../MatchmakingStopwatch/MatchmakingStopwatch';
import {
  useCancelMatchmakingMutation,
  useJoinMatchmakingMutation,
  useListenToGameStartedQuery,
} from '../matchmakingApi';
import S from './Lobby.styled';

export const Lobby = () => {
  const [isWaiting, setIsWaiting] = useState(false);

  const [joinMatchmaking] = useJoinMatchmakingMutation();
  const [cancelMatchmaking] = useCancelMatchmakingMutation();

  const {} = useListenToGameStartedQuery(null);

  const playHandler = async () => {
    setIsWaiting(true);
    await joinMatchmaking(null);
  };

  const cancelHandler = async () => {
    setIsWaiting(false);
    await cancelMatchmaking(null);
  };

  return (
    <S.Wrapper>
      {isWaiting ? (
        <BigButton
          onClick={cancelHandler}
          color="error"
        >
          Cancel
        </BigButton>
      ) : (
        <BigButton
          onClick={playHandler}
          color="success"
        >
          Play Game
        </BigButton>
      )}
      {isWaiting && <MatchmakingStopwatch />}
    </S.Wrapper>
  );
};
