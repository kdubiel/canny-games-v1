import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CookiesService } from 'src/shared/services/cookies.service';
import { RequestAuthenticationService } from 'src/shared/services/request-authentication.service';
import { WsAuthenticationService } from 'src/shared/services/ws-authentication.service';

@Module({
  imports: [JwtModule],
  providers: [
    RequestAuthenticationService,
    CookiesService,
    WsAuthenticationService,
  ],
  exports: [
    RequestAuthenticationService,
    CookiesService,
    WsAuthenticationService,
  ],
})
export class CommonModule {}
