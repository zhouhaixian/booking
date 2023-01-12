import { Role } from '@booking/types';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('info')
  async findOne(@Request() req) {
    try {
      const { name, id, sex, subjects, role } =
        await this.usersService.findOneById(req.user.id);
      return { name, id, sex, subjects, role };
    } catch {
      return null;
    }
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get()
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let { password } = updateUserDto;
    if (password !== undefined) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      delete updateUserDto.password;
    }

    const { id: id_ } = updateUserDto;
    const result = await this.usersService.findOneById(id_);
    if (result !== null && result.id !== id) {
      throw new BadRequestException('user already exists');
    }

    await this.usersService.update(id, {
      ...updateUserDto,
      password,
    });
    return updateUserDto;
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { id };
  }
}
