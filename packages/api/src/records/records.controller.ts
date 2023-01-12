import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { ApiTags } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/zh-cn';

dayjs.extend(isBetween);
dayjs.locale('zh-cn');

@ApiTags('records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
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

    return this.recordsService.create({
      name,
      class: class_,
      grade: grade_,
      subject,
      index,
      start_time: dayjs(start_time).toDate(),
      end_time: dayjs(end_time).toDate(),
    });
  }

  @Get('schedule')
  findSevenDays() {
    const today = dayjs();
    const nextWeek = today.add(7, 'day');
    return this.recordsService.find({
      start_time: {
        $gte: today.startOf('date').toDate(),
        $lt: nextWeek.startOf('date').toDate(),
      },
    });
  }

  // @Get()
  // findAll() {
  //   return this.recordsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.recordsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
  //   return this.recordsService.update(+id, updateRecordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recordsService.remove(+id);
  // }
}
