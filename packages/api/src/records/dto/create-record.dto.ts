import { Subject } from '@booking/types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IsSubject } from 'src/validators/is-subject';

export class CreateRecordDto extends PickType(CreateUserDto, ['name']) {
  @ApiProperty()
  @IsString()
  @Length(2, 16)
  grade: string;

  @ApiProperty()
  @IsString()
  @Length(1, 16)
  class: string;

  @ApiProperty()
  @IsSubject()
  subject: Subject;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(7)
  index: number;

  @ApiProperty()
  @IsString()
  @IsDateString()
  @Length(24)
  start_time: Date;

  @ApiProperty()
  @IsString()
  @IsDateString()
  @Length(24)
  end_time: Date;
}
