import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ShopManagementModule } from './shop-management/shop-management.module';

@Module({
  imports: [JwtModule, PrismaModule, JwtModule, ShopManagementModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}