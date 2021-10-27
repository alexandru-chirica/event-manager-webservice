import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { HasherService } from './services/hasher.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseContextService } from '../database-access/services/database-context.service';
import { FileService } from '../shared/services/file.service';
import { UserService } from '../shared/services/user.service';
@Module({
  controllers: [AuthenticationController],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: configService.get<number>('tokenExpirationInSeconds'),
        },
      }),
    }),
    PassportModule,
  ],
  providers: [
    AuthenticationService,
    ConfigService,
    DatabaseContextService,
    FileService,
    HasherService,
    LocalStrategy,
    JwtStrategy,
    UserService,
  ],
})
export class AuthenticationModule {}
