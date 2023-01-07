import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
    const auth = context.switchToRpc().getData().headers.authorization;
    if (auth !== undefined) {
      try {
        const token = auth.replace('bearer ', '');
        const { id } = this.jwtService.decode(token) as { id: string };
        const user = await this.usersService.findOneById(id);
        return requiredRoles.some((role) => user.role?.includes(role));
      } catch {
        return false;
      }
    } else if (process.env['NODE_ENV'] === 'development') {
      return true;
    } else {
      return false;
    }
  }
}
