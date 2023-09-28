// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserTestDto } from './dto/create-user-test.dto';
import { UpdateUserTestDto } from './dto/update-user-test.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserTestEntity } from './entities/user-test.entity';
import { UserTestService } from './user-test.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/role/decorator/role.decorator';
import { Permissions } from 'src/permission/decorator/permission.decorator';
import { Role } from 'src/role/enums/role.enum';
import { Permission } from 'src/permission/enums/permission.enum';
import { AuthGuards } from 'src/auth/auth.guard';
import { MailerService } from '@nest-modules/mailer';

@Controller('userTest')
@ApiTags('userTest')
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}

  @Post()
  // @Roles(Role.ADMIN)
  // @Permissions(Permission.CREATE)
  // @UseGuards(JwtAuthGuard, AuthGuards)
  // @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: UserTestEntity })
  async create(@Body() createUserTestDto: CreateUserTestDto) {
    return new UserTestEntity(
      await this.userTestService.create(createUserTestDto),
    );
  }

  @Get()
  @Roles(Role.ADMIN, Role.STAFF)
  @Permissions(Permission.READ)
  @UseGuards(JwtAuthGuard, AuthGuards)
  @ApiBearerAuth('JWT-auth')
  async findAll() {
    console.log(123);
    const users = await this.userTestService.findAll();
    return users.map((user) => new UserTestEntity(user));
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  @Permissions(Permission.READ)
  @UseGuards(JwtAuthGuard, AuthGuards)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: UserTestEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserTestEntity(await this.userTestService.findOne(id));
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @Permissions(Permission.UPDATE)
  @UseGuards(JwtAuthGuard, AuthGuards)
  // @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: UserTestEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserTestDto: UpdateUserTestDto,
  ) {
    return new UserTestEntity(
      await this.userTestService.update(id, updateUserTestDto),
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @Permissions(Permission.DELETE)
  // @UseGuards(JwtAuthGuard, AuthGuards)
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: UserTestEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserTestEntity(await this.userTestService.remove(id));
  }
}
