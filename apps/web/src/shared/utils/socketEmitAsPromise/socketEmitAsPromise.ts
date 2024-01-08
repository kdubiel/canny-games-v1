import { Socket } from 'socket.io-client';

// TODO: Improve this type
interface WsResponse<TData = any> {
  error?: string;
  data?: TData;
}

export const socketEmitAsPromise = (socket: Socket) => {
  return <TData = any>(message: string, data: TData): Promise<any> => {
    return new Promise((resolve, reject) => {
      socket.emit(message, data, (response: WsResponse<TData>) => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  };
};
