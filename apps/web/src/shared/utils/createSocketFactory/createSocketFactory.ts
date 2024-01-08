import { Socket, io } from 'socket.io-client';

// TODO: Implement reconnection
export const createSocketFactory = (wsNamespace: string) => {
  let _socket: Socket;

  return (): Socket => {
    if (!_socket) {
      _socket = io(`/${wsNamespace}`, {
        transports: ['websocket'],
        withCredentials: true,
        autoConnect: false,
      });
    }

    return _socket;
  };
};
