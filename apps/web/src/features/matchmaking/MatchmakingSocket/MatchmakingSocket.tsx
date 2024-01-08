import { ReactNode, useEffect, useRef } from 'react';
import { createSocketFactory } from '@/shared/utils/createSocketFactory';

export const matchmakingSocket = createSocketFactory('matchmaking')();

type MatchmakingSocketProps = {
  children: ReactNode;
};

export const MatchmakingSocket = ({ children }: MatchmakingSocketProps) => {
  const connected = useRef<boolean>(false);
  const connecting = useRef<boolean>(false);

  useEffect(() => {
    if (!connected.current && !connecting.current) {
      connecting.current = true;
      matchmakingSocket.connect();
    }

    return () => {
      if (connected.current) {
        matchmakingSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    matchmakingSocket.on('connect', () => {
      connected.current = true;
      connecting.current = false;
    });

    matchmakingSocket.on('disconnect', () => {
      connected.current = false;
    });

    return () => {
      matchmakingSocket.off('connect');
      matchmakingSocket.off('disconnect');
    };
  }, []);

  return connected ? <>{children}</> : null;
};
