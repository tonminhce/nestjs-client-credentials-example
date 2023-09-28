import { Injectable } from '@nestjs/common';
import { CreateUserTestDto } from './dto/create-user-test.dto';
import { UpdateUserTestDto } from './dto/update-user-test.dto';
import { UserTestRepository } from './user-test.repository';
import { plainToClass } from 'class-transformer';
import { UserTestEntity } from './entities/user-test.entity';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class UserTestService {
  constructor(
    private userTestRepository: UserTestRepository,
    private mailerService: MailerService,
  ) {}

  async create(createUserTestDto: CreateUserTestDto) {
    console.log(createUserTestDto.password)
    const userEntity = plainToClass(UserTestEntity, createUserTestDto);
    console.log(userEntity.password)
    console.log(userEntity.email)
    await this.mailerService.sendMail({
      to: userEntity.email,
      subject: "Welcome to the application",
      template: './welcome',
      context: {
        name: userEntity.name,
      },
  });
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
