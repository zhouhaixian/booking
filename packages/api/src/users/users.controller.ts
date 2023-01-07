import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Request,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '@booking/types';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const { name, id } = createUserDto;
    let { password } = createUserDto;
    if (await this.usersService.isExists(id))
      throw new BadRequestException('user already exists');

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    if (!(await this.hasAdmin())) {
      this.usersService.create({
        ...createUserDto,
        password,
        role: Role.Admin,
      });
    } else {
      this.usersService.create({
        ...createUserDto,
        password,
        role: Role.User,
      });
    }

    return { name, id };
  }

  @Get('has-admin')
  async hasAdmin() {
    return (await this.usersService.findOne({ role: Role.Admin })) !== null;
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async info(@Request() req) {
    try {
      const { name, id, sex, subjects, role } =
        await this.usersService.findOneById(req.user.id);
      return { name, id, sex, subjects, role };
    } catch {
      return null;
    }
  }

  @Roles(Role.Admin)
  @Get()
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //    TODO: 权限管理，不轻易对外公开信息    PASSPORT     @nestjs/passwort
  //   return '';
  //   return this.usersService.findOne(id);
  // }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let { password } = updateUserDto;
    if (password !== undefined) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      delete updateUserDto.password;
    }

    await this.usersService.update(id, {
      ...updateUserDto,
      password,
    });
    return updateUserDto;
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { id };
  }
}
