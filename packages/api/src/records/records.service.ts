import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record, RecordDocument } from './schema/record.schema';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  create(createRecordDto: CreateRecordDto) {
    return this.recordModel.create(createRecordDto);
  }

  findAll(query: any) {
    return this.recordModel.find(query);
  }

  remove(record: Record) {
    return this.recordModel.findOneAndRemove(record);
  }
}
