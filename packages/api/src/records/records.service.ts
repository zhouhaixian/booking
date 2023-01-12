import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record, RecordDocument } from './schema/record.schema';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  create(createRecordDto: CreateRecordDto) {
    return this.recordModel.create(createRecordDto);
  }

  find(query) {
    return this.recordModel.find(query);
  }

  findAll() {
    return `This action returns all records`;
  }

  findOne(id: number) {
    return `This action returns a #${id} record`;
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    return `This action updates a #${id} record`;
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
