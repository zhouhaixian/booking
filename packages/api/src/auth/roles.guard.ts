import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@booking/types';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const {
      headers: { authorization: auth },
      body,
      params,
    } = context.switchToRpc().getData();
    if (auth !== undefined) {
      try {
        const token = auth.replace('bearer ', '').replace('Bearer ', '');
        const { id } = this.jwtService.decode(token) as { id: string };
        const user = await this.usersService.findOneById(id);
        return requiredRoles.some((role) => {
          if (role === Role.User) {
            return body.id === user.id || params.id === user.id;
          } else {
            return user.role === role;
          }
        });
      } catch {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
