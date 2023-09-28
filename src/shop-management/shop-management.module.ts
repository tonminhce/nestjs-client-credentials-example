import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShopManagementService } from './shop-management.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ShopManagementController } from './shop-management.controller';
import { ShopManagementRepository } from './shop-management.repository';
import { AuthMiddleware } from './auth.middleware';
import { FlagService } from './flag.service';

@Module({
  imports: [PrismaModule],
  controllers: [ShopManagementController],
  providers: [
    ShopManagementService,
    ShopManagementRepository,
    FlagService
  ],
})
export class ShopManagementModule {}
