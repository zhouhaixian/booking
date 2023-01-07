import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JWT_SECRET } from '@booking/configs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(loginDto: LoginDto) {
    const { id, password: pass } = loginDto;
    const user = await this.usersService.findOneById(id);
    if (user !== null && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const { id, name } = user;
    return {
      token: this.jwtService.sign({ id, name }, { secret: JWT_SECRET }),
    };
  }
}
