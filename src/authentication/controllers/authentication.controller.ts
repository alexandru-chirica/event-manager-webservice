import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDataDto } from '../dtos/user-data.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthenticationService } from '../services/authentication.service';

@Controller('auth')
export class AuthenticationController {
  // --- Constructor ---
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: UserDataDto })
  @ApiResponse({ status: 200, type: String })
  @UsePipes(new ValidationPipe())
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }
}
