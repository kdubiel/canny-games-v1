import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { BullModule } from '@nestjs/bull';
import config, { AppConfig } from 'src/shared/config/config';
import { TicTacToeModule } from 'src/tic-tac-toe/tic-tac-toe.module';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { HelloWorldModule } from 'src/hello-world/hello-world.module';
import { MatchmakingModule } from 'src/matchmaking/matchmaking.module';
import { MatchesModule } from '@/matches/matches.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
        autoLogging: false,
        quietReqLogger: process.env.NODE_ENV === 'development',
      },
    }),
    MikroOrmModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig>) => {
        const { host, port } = configService.get<AppConfig>('redis', {
          infer: true,
        });

        return {
          redis: {
            host,
            port,
          },
        };
      },
    }),
    UsersModule,
    TicTacToeModule,
    AuthenticationModule,
    HelloWorldModule,
    MatchmakingModule,
    MatchesModule,
  ],
})
export class AppModule {}
