import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AppConfig } from 'src/shared/config/config';
import { InvalidTokenException } from '../exceptions/invalid-token.exception';
import { JwtUser } from '../entities/jwt-user.entity';
import { JwtPayload, isJwtPayload } from '../typings/jwt-payload.interface';
import { CookiesService } from './cookies.service';
import type { Request, Response } from 'express';

@Injectable()
export class RequestAuthenticationService {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly cookiesService: CookiesService,
    private readonly jwtService: JwtService,
  ) {}

  async setAuthTokens(res: Response, jwtPayload: JwtPayload) {
    const accessToken = await this.createAccessToken(jwtPayload);
    const refreshToken = await this.createRefreshToken(jwtPayload);

    this.cookiesService.setTokensInCookies(res, accessToken, refreshToken);
  }

  async logout(res: Response) {
    await this.cookiesService.removeTokensFromCookies(res);
  }

  async refreshTokens(res: Response, req: Request) {
    const { data } = await this.decodeRefreshTokenFromRequest(req);

    await this.setAuthTokens(res, { data });
  }

  async validateUserRequest(req: Request): Promise<JwtUser> {
    try {
      const {
        data: { user },
      } = await this.decodeAccessTokenFromRequest(req);

      return user;
    } catch (error) {
      throw new InvalidTokenException();
    }
  }

  async decodeAccessTokenFromRequest(req: Request): Promise<JwtPayload> {
    const { accessTokenSecret } = this.configService.get('jwt', {
      infer: true,
    });

    const accessToken = this.cookiesService.extractAccessTokenFromCookies(req);

    if (!accessToken) {
      throw new InvalidTokenException();
    }

    const jwtPayload = await this.jwtService.verifyAsync<JwtPayload>(
      accessToken,
      {
        secret: accessTokenSecret,
      },
    );

    if (!isJwtPayload(jwtPayload)) {
      throw new InvalidTokenException();
    }

    return jwtPayload;
  }

  async decodeRefreshTokenFromRequest(req: Request): Promise<JwtPayload> {
    const { refreshTokenSecret } = this.configService.get('jwt', {
      infer: true,
    });

    const refreshToken =
      this.cookiesService.extractRefreshTokenFromCookies(req);

    if (!refreshToken) {
      throw new InvalidTokenException();
    }

    const jwtPayload = await this.jwtService.verifyAsync<JwtPayload>(
      refreshToken,
      {
        secret: refreshTokenSecret,
      },
    );

    if (!isJwtPayload(jwtPayload)) {
      throw new InvalidTokenException();
    }

    return jwtPayload;
  }

  private createAccessToken(jwtPayload: JwtPayload): Promise<string> {
    const { accessTokenMaxAge, accessTokenSecret } = this.configService.get(
      'jwt',
      { infer: true },
    );

    return this.jwtService.signAsync(jwtPayload, {
      secret: accessTokenSecret,
      expiresIn: accessTokenMaxAge,
    });
  }

  private createRefreshToken(jwtPayload: JwtPayload): Promise<string> {
    const { refreshTokenMaxAge, refreshTokenSecret } = this.configService.get(
      'jwt',
      { infer: true },
    );

    return this.jwtService.signAsync(jwtPayload, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenMaxAge,
    });
  }
}
