import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateConfigDto {
  @IsString()
  @Length(2, 256)
  @ApiProperty()
  booking_successful_message: string;

  @IsString()
  @Length(2, 256)
  @ApiProperty()
  forgot_password_message: string;
}
