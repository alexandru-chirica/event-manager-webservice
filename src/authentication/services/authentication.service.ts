import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../shared/services/user.service';
import { ILoginUserData } from '../contracts/login-user-data.interface';
import { HashingOptionsModel } from '../models/hashing-options.model';
import { HasherService } from './hasher.service';

@Injectable()
export class AuthenticationService {
  // --- Constructor ---

  constructor(
    private hasherService: HasherService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // --- Public methods ---

  async login(usedData: ILoginUserData) {
    const token = this.jwtService.sign(usedData);

    return token;
  }

  async validateUser(email: string, password: string) {
    const foundUser = await this.userService.findOneByEmail(email);

    if (!foundUser) {
      return null;
    }

    const { password: hashedPassword, ...user } = foundUser;
    const options = new HashingOptionsModel();
    const { needsUpgrade, verified } = await this.hasherService.check(
      hashedPassword,
      password,
      options,
    );

    // Update the hashed password with the new iterations count since it's outdated.
    if (needsUpgrade) {
      const newPassword = await this.hasherService.hash(password, options);

      await this.userService.updateOne(email, {
        password: newPassword,
        updatedAt: new Date(),
      });
    }

    return verified ? user : null;
  }
}
