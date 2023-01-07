import { Role } from '@booking/types';
import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { ConfigsService } from './configs.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';

@ApiTags('configs')
@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configsService.create(createConfigDto);
  }

  @Get()
  getConfigs() {
    return this.configsService.findOne();
  }

  @Get('booking-successful-message')
  async getBookingSuccessfulMessage() {
    let booking_successful_message = null;
    try {
      const { booking_successful_message: result } =
        await this.configsService.findOne();
      booking_successful_message = result;
    } catch {}
    return booking_successful_message;
  }

  @Get('forgot-password-message')
  async getForgotPasswordMessage() {
    let forgot_password_message = null;
    try {
      const { forgot_password_message: result } =
        await this.configsService.findOne();
      forgot_password_message = result;
    } catch {}
    return forgot_password_message;
  }

  @Roles(Role.Admin)
  @Patch()
  async update(@Body() updateConfigDto: UpdateConfigDto) {
    await this.configsService.update(updateConfigDto);
    return updateConfigDto;
  }
}
