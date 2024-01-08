import { ReactNode, useEffect } from 'react';
import { createSocketFactory } from '@/shared/utils/createSocketFactory';

export const ticTacToeSocket = createSocketFactory('tic-tac-toe')();

type TicTacToeSocketProps = {
  children: ReactNode;
};

export const TicTacToeSocket = ({ children }: TicTacToeSocketProps) => {
  useEffect(() => {
    if (!ticTacToeSocket.connected) {
      ticTacToeSocket.connect();
    }
    return () => {
      if (ticTacToeSocket.connected) {
        ticTacToeSocket.disconnect();
      }
    };
  }, []);

  return children;
};
