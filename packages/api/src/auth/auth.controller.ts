import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Role } from '@booking/types';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() _: LoginDto, @Req() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Get('admin')
  async admin(@Req() req) {
    return 'you is admin';
  }
}
