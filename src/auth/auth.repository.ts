// src/auth/auth.repository.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { get } from 'http';

@Injectable()
export class AuthRepository {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    return this.prisma.userTest.findUnique({
      where: { email },
    });
  }

  async validateClient(clientID, clientSecret: string) {
    return clientID;
  }
  async getRoleName(userId: number) {
    const userRole = await this.prisma.userRole.findMany({
      where: {
        userId: userId,
      },
      select: {
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });
    const roleNames = userRole.map((userRole) => userRole.role.roleName);
    return roleNames;
  }

  async getRoleAndPermissionByUserId(userId: number) {
    const userRolePermissions = await this.prisma.userRole.findMany({
      where: {
        userId: 1,
      },
      include: {
        role: {
          select: {
            // roleName: true,
            role_permission: {
              select: {
                permission: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const rolePermissions = userRolePermissions.map((userRolePermissions) => ({
      // roleName: userRolePermissions.role.roleName,
      permissions: userRolePermissions.role.role_permission.map(
        (rp) => rp.permission.title,
      ),
    }));
    return rolePermissions;
  }

  async getPermission(userId: number) {
    const userRolePermissions = await this.prisma.userRole.findMany({
      where: {
        userId: 1,
      },
      include: {
        role: {
          select: {
            roleName: true,
            role_permission: {
              select: {
                permission: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const rolePermissions = userRolePermissions.map((userRolePermissions) => ({
      // roleName: userRolePermissions.role.roleName,
      permissions: userRolePermissions.role.role_permission.map(
        (rp) => rp.permission.title,
      ),
    }));
    return rolePermissions;
  }

  async createToken(userId: number) {
    const roleNames = await this.getRoleAndPermissionByUserId(userId);
    const payload = {
      // userId: userId,
      roles: roleNames,
    };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  // async createRefreshToken(userId: number): Promise<string> {
  //   const refreshToken = this.jwtService.sign(
  //     // { sub: userId },
  //     { expiresIn: '7d' },
  //   );
  //   return refreshToken;
  // }
}
