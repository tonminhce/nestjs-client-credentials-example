import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './role.repository';
import { plainToClass } from 'class-transformer';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleEntity = plainToClass(RoleEntity, createRoleDto);
    return this.roleRepository.create(roleEntity);
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  findOne(id: number) {
    return this.roleRepository.findOne(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.remove(id);
  }
}
