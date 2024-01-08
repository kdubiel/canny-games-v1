import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/shared/config/config';
import type { Request, Response } from 'express';

@Injectable()
export class CookiesService {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  removeTokensFromCookies(res: Response): void {
    const { accessTokenCookieName, refreshTokenCookieName } =
      this.configService.get('jwt', { infer: true });

    res.clearCookie(accessTokenCookieName);
    res.clearCookie(refreshTokenCookieName);
  }

  extractRefreshTokenFromCookies(req: Request): string | undefined {
    const { refreshTokenCookieName } = this.configService.get('jwt', {
      infer: true,
    });

    return req.cookies[refreshTokenCookieName];
  }

  extractAccessTokenFromCookies(req: Request): string | undefined {
    const { accessTokenCookieName } = this.configService.get('jwt', {
      infer: true,
    });

    return req.cookies[accessTokenCookieName];
  }

  setAccessTokenInCookies(res: Response, accessToken: string) {
    const { accessTokenCookieName, accessTokenMaxAge } = this.configService.get(
      'jwt',
      {
        infer: true,
      },
    );

    res.cookie(accessTokenCookieName, accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: accessTokenMaxAge,
    });
  }

  setRefreshTokenInCookies(res: Response, refreshToken: string): void {
    const { refreshTokenCookieName, refreshTokenMaxAge } =
      this.configService.get('jwt', {
        infer: true,
      });

    res.cookie(refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: refreshTokenMaxAge,
    });
  }

  setTokensInCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ): void {
    this.setAccessTokenInCookies(res, accessToken);
    this.setRefreshTokenInCookies(res, refreshToken);
  }
}
