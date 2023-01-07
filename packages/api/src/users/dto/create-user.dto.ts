import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsAscii,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role, Sex, Subject } from '@booking/types';
import { ArrayOnlySubject } from 'src/validators/array-only-subject';
import { IsSex } from 'src/validators/is-sex';
import { ApiProperty } from '@nestjs/swagger';
import { SUBJECTS } from '@booking/configs';

export class CreateUserDto {
  @IsString()
  @Length(2, 16)
  @ApiProperty()
  name: string;

  @IsString()
  @Matches(/^1\d{10}$/, { message: 'id must be a phone number' })
  @ApiProperty()
  id: string;

  @IsString()
  @IsAscii()
  @Length(8, 25)
  @ApiProperty()
  password: string;

  @IsString()
  @IsSex()
  @ApiProperty({ type: String })
  sex: Sex;

  @IsArray()
  @ArrayMaxSize(SUBJECTS.length)
  @ArrayNotEmpty()
  @ArrayUnique()
  @ArrayOnlySubject()
  @ApiProperty({ type: Array })
  subjects: Subject[];

  role: Role;
}
