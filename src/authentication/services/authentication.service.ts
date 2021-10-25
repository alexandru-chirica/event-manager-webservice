import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../shared/services/user.service';
import { ILoginUserData } from '../contracts/login-user-data.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
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

  async login(userData: ILoginUserData) {
    const token = this.jwtService.sign(userData);

    return token;
  }

  async register(userData: CreateUserDto) {
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
