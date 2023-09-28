// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class ShopManagementEntity {
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

  @ApiProperty()
  phone: string;

  constructor(partial: Partial<ShopManagementEntity>) {
    Object.assign(this, partial);
  }
}
