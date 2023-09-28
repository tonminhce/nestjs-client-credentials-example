import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission, Role } from '@prisma/client';
import axios from 'axios';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    const requiredPermissions = this.reflector.get<Permission[]>(
      'permissions',
      context.getHandler(),
    );

    // Get info user from request
    const user = context.switchToHttp().getRequest().user;
    await axios.post ('http://localhost:3001/ShopManagement/token',{
      token: user.token
    });
    // // Nếu không có requiredRoles hoặc user không tồn tại, cho phép truy cập
    if (!requiredRoles) {
      return false;
    }
    // console.log(user);
    
    const hasRequiredRole = requiredRoles.some((role) => {
      return user.user_role.some((userRole) => userRole.role.roleName === role);
    });
    console.log(requiredPermissions);
    if (hasRequiredRole) {
      const hasRequiredPermission = requiredPermissions.some(
        (requiredPermission) => {
          return user.user_role.some((userRole) => {
            console.log(userRole.role.role_permission);

            return userRole.role.role_permission.some((rolePermission) => {
              const titles = rolePermission.permission;
              console.log(titles.title);
              console.log(requiredPermission);
              if (titles.title == requiredPermission) {
                return true;
              }
              return false;
            });
          });
        },
      );

      if (hasRequiredPermission == true) {
        return true;
      } else {
        return false;
      }
      //return hasRequiredPermission;
    }

    // return hasRequiredRole;
  }
}
