import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserTestDto } from './dto/update-user-test.dto';

import * as bcrypt from 'bcrypt';
import { UserTest } from '@prisma/client';

export const roundsOfHashing = 10;

@Injectable()
export class UserTestRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: UserTest) {
    console.log(user.password);
    const hashedPassword = await bcrypt.hash(user.password, roundsOfHashing);
    user.password = hashedPassword;
    console.log(user.password);
    return this.prisma.userTest.create({ data: user });
  }

  findAll() {
    return this.prisma.userTest.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        user_role: {
          select: {
            role: {
              select: {
                roleName: true,
                description: true,
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
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.userTest.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        user_role: {
          select: {
            role: {
              select: {
                roleName: true,
                description: true,
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
        },
      },
    });
  }

  async update(id: number, updateUserTestDto: UpdateUserTestDto) {
    if (updateUserTestDto.password) {
      updateUserTestDto.password = await bcrypt.hash(
        updateUserTestDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.userTest.update({
      where: { id },
      data: updateUserTestDto,
    });
  }

  remove(id: number) {
    return this.prisma.userTest.delete({ where: { id } });
  }
}
