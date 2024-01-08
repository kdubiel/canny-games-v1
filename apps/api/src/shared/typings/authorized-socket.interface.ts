import { Socket } from 'socket.io';
import { JwtUser } from '../entities/jwt-user.entity';

export interface AuthorizedSocket extends Socket {
  data: {
    user: JwtUser;
  };
}
