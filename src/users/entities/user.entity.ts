// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { UserArticles } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements UserArticles {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
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

  @Exclude()
  password: string;
}
