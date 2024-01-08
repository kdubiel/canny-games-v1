import { AuthenticationStrategies } from '../../authentication/domain/authentication.strategy';
import { JwtUser } from '../entities/jwt-user.entity';

export interface JwtPayload {
  data: {
    user: JwtUser;
    authStrategy: AuthenticationStrategies;
  };
  exp?: number;
  iat?: number;
}

export const isJwtPayload = (payload?: any): payload is JwtPayload =>
  payload &&
  typeof payload === 'object' &&
  payload.data &&
  typeof payload.data === 'object' &&
  payload.data.authStrategy &&
  typeof payload.data.authStrategy === 'string' &&
  Object.values(AuthenticationStrategies).includes(
    payload.data.authStrategy as AuthenticationStrategies,
  ) &&
  payload.data.user &&
  typeof payload.data.user === 'object' &&
  payload.exp &&
  typeof payload.exp === 'number' &&
  payload.iat &&
  typeof payload.iat === 'number';
