import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserTestModule } from './user-test/user-test.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule,
    AuthModule,
    UserTestModule,
    RoleModule,
    PermissionModule,
    UserRoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}