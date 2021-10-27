import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsDateString()
  @ApiProperty({
    description: 'The end date of the event.',
  })
  readonly endDate: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The location of the event.',
  })
  readonly location: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the event.',
  })
  readonly name: string;

  @IsDateString()
  @ApiProperty({
    description: 'The start date of the event.',
  })
  readonly startDate: string;
}
