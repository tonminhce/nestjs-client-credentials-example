import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RoleRepository } from './role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  imports: [PrismaModule],
})
export class RoleModule {}
