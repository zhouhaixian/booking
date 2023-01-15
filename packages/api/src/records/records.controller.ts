import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/zh-cn';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from '@booking/types';
import { UsersService } from 'src/users/users.service';
import { Roles } from 'src/auth/roles.decorator';

dayjs.extend(isBetween);
dayjs.locale('zh-cn');

@ApiTags('records')
@UseGuards(JwtAuthGuard)
@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordsService: RecordsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto, @Request() req) {
    const {
      name,
      class: class_,
      grade: grade_,
      subject,
      index,
      start_time,
      end_time,
    } = createRecordDto;

    if (
      !dayjs(start_time).isBetween(
        dayjs(),
        dayjs().add(7, 'day').startOf('date'),
      )
    ) {
      throw new BadRequestException('start_time is out of range');
    }

    const user = await this.usersService.findOneById(req.user.id);
    if (user.role !== Role.Admin) {
      const today = dayjs();
      const nextWeek = today.add(7, 'day');
      const result = await this.recordsService.findAll({
        id: req.user.id,
        start_time: {
          $gte: today.startOf('date').toDate(),
          $lt: nextWeek.startOf('date').toDate(),
        },
      });
      if (result.length >= 2) {
        throw new BadRequestException('You can only book two lessons a week');
      }
    }

    return this.recordsService.create({
      name,
      class: class_,
      grade: grade_,
      subject,
      index,
      start_time: dayjs(start_time).toDate(),
      end_time: dayjs(end_time).toDate(),
      id: user.id,
    });
  }

  @Get('schedule')
  findSevenDays() {
    const today = dayjs();
    const nextWeek = today.add(7, 'day');
    return this.recordsService.findAll({
      start_time: {
        $gte: today.startOf('date').toDate(),
        $lt: nextWeek.startOf('date').toDate(),
      },
    });
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Delete()
  async remove(@Body() body, @Request() req) {
    const user = await this.usersService.findOneById(req.user.id);

    if (user.role !== Role.Admin && dayjs().isAfter(dayjs(body.start_time))) {
      throw new BadRequestException(
        'You can only cancel a lesson before it starts',
      );
    }
    return this.recordsService.remove(body);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.recordsService.findAll({ id });
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get()
  findAll(@Query() query: any) {
    return this.recordsService.findAll(query);
  }
}
