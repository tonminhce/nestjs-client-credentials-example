//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class ResEntity {
  @ApiProperty()
  inputs: string;

  // @ApiProperty()
  // refreshToken: string;
}
