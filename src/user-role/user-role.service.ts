import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}
  create(createUserRoleDto: CreateUserRoleDto) {
    return 'This action adds a new userRole';
  }

  findAll() {
    return `This action returns all userRole`;
  }

  findMany(id: number) {
    return this.prisma.userRole.findMany({
      where: { id },
    });
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }
}
