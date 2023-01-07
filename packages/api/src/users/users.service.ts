import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll(query: any) {
    return this.userModel.find(query);
  }

  findOne(query: any) {
    return this.userModel.findOne(query);
  }

  findOneById(id: string) {
    return this.userModel.findOne({ id });
  }

  async isExists(id: string) {
    return (await this.userModel.exists({ id })) !== null;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.findOneAndRemove({ id });
  }
}
