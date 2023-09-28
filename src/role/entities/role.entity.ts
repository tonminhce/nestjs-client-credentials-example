import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roleName: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
