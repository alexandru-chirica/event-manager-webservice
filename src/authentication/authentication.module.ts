import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { HasherService } from './services/hasher.service';
import { DatabaseContextService } from '../database-access/services/database-context.service';
import { UserService } from '../shared/services/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthenticationController],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: configService.get<number>('tokenExpirationInSeconds'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  providers: [
    AuthenticationService,
    ConfigService,
    DatabaseContextService,
    HasherService,
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
  exports: [LocalStrategy],
})
export class AuthenticationModule {}
