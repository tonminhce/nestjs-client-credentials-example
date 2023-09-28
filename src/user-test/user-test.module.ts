import { Module } from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { UserTestController } from './user-test.controller';
import { UserTestRepository } from './user-test.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { PermissionsGuards } from 'src/permission/permission.guard';
import { AuthGuards } from 'src/auth/auth.guard';

@Module({
  controllers: [UserTestController],
  providers: [
    UserTestService,
    UserTestRepository,
    JwtService,
    AuthGuards,
    PermissionsGuards,
  ],
  imports: [PrismaModule],
})
export class UserTestModule {}
