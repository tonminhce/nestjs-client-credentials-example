import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';
import { ShopManagementEntity } from './entities/shop-management.entity';
// import { UserTest } from '@prisma/client';
export const roundsOfHashing = 10;
Injectable()
export class ShopManagementRepository {

  constructor(private prisma: PrismaService) {}
  // async create(user: UserTest) {
  //   const hashedPassword = await bcrypt.hash(user.password, roundsOfHashing);
  //   user.password = hashedPassword;
  //   return this.prisma.userTest.create({ data: user });
  // }
  async create( ) {
    return "hello123";
  }
  findAll() {
    return 'hello123';
  }
}
