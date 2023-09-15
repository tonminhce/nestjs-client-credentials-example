import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.userArticles.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.userArticles.findMany();
  }

  findOne(id: number) {
    return this.prisma.userArticles.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.userArticles.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.userArticles.delete({ where: { id } });
  }
}
