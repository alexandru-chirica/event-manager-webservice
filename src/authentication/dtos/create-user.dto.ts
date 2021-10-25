import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

import { User } from '../../database-access/entities/user.entity';

export class CreateUserDto implements Partial<User> {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user trying to log in.',
    example: 'example@domain.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  readonly name: string;

  @MinLength(8)
  @ApiProperty({
    description: 'The password of the user.',
    example: 'HardToGuess!@#123*()Password',
    minLength: 8,
  })
  readonly password: string;
}
