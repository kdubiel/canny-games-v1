import type { Request, Response } from 'express';

export enum AuthenticationStrategies {
  Credentials = 'CREDENTIALS',
}

export abstract class AuthenticationStrategy {
  strategy: AuthenticationStrategies;

  abstract logout(req: Request, res: Response): Promise<void>;
  abstract refreshToken(req: Request, res: Response): Promise<void>;
}
