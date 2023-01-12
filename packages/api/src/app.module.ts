import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { TransformInterceptor } from './transform/transform.interceptor';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { DATABASE_URL } from '@booking/configs';
import { ConfigsModule } from './configs/configs.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 86400,
      limit: 200,
    }),
    MongooseModule.forRoot(DATABASE_URL),
    AuthModule,
    JwtModule,
    ConfigsModule,
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
