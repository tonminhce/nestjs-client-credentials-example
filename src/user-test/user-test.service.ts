import { Injectable } from '@nestjs/common';
import { CreateUserTestDto } from './dto/create-user-test.dto';
import { UpdateUserTestDto } from './dto/update-user-test.dto';
import { UserTestRepository } from './user-test.repository';
import { plainToClass } from 'class-transformer';
import { UserTestEntity } from './entities/user-test.entity';

@Injectable()
export class UserTestService {
  constructor(private userTestRepository: UserTestRepository) {}

  async create(createUserTestDto: CreateUserTestDto) {
    const userEntity = plainToClass(UserTestEntity, createUserTestDto);
    return this.userTestRepository.create(userEntity);
  }

  findAll() {
    return this.userTestRepository.findAll();
  }

  findOne(id: number) {
    return this.userTestRepository.findOne(id);
  }

  async update(id: number, updateUserTestDto: UpdateUserTestDto) {
    return this.userTestRepository.update(id, updateUserTestDto);
  }

  remove(id: number) {
    return this.userTestRepository.remove(id);
  }
}
