import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { HasherService } from './hasher.service';
import { ILoginUserData } from '../contracts/login-user-data.interface';
import { User } from '../../database-access/entities/user.entity';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class AuthenticationService {
  // --- Constructor ---

  constructor(
    private hasherService: HasherService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // --- Public methods ---

  async login(userData: ILoginUserData) {
    const token = this.jwtService.sign(userData);

    return token;
  }

  async register(userData: User) {
    const { email, password } = userData;
    const foundUser = await this.userService.findOneByEmail(email);

    if (foundUser) {
      throw new ConflictException('The specified email is already registed.');
    }

    const newPassword = await this.hasherService.hash(password);

    await this.userService.insertOne({ ...userData, password: newPassword });
  }

  async validateUser(email: string, password: string) {
    const foundUser = await this.userService.findOneByEmail(email);

    if (!foundUser) {
      return null;
    }

    const { password: hashedPassword, ...user } = foundUser;
    const verified = await this.hasherService.check(hashedPassword, password);

    return verified ? user : null;
  }
}
