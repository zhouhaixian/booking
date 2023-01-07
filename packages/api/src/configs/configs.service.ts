import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config } from './schema/config.schema';
import { ConfigDocument } from './schema/config.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectModel(Config.name) private configModel: Model<ConfigDocument>,
  ) {}

  create(createConfigDto: CreateConfigDto) {
    return this.configModel.create(createConfigDto);
  }

  findOne() {
    return this.configModel.findOne();
  }

  async update(updateConfigDto: UpdateConfigDto) {
    const config = await this.configModel.findOneAndUpdate();
    await config.updateOne(updateConfigDto);
    await config.save();
    return config;
  }
}
