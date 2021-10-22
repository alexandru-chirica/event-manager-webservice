import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ILoginUserData } from '../contracts/login-user-data.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // -- Constructor ---

  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret'),
    });
  }

  // --- Public methods ---

  async validate(payload: ILoginUserData) {
    return payload;
  }
}
