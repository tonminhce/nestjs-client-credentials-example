import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleEntity } from './entities/role.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

export const roundsOfHashing = 10;

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async create(roleEntity: RoleEntity) {
    return this.prisma.role.create({ data: roleEntity });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
