import type { Socket } from 'socket.io';

export type ConnectedSockets = { [key: string]: Socket[] };
