// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserTestEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  password: string;

  @ApiProperty()
  phone: string;

  constructor(partial: Partial<UserTestEntity>) {
    Object.assign(this, partial);
  }
}
