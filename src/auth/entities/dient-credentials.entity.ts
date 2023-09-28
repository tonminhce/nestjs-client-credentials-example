import { ApiProperty } from '@nestjs/swagger';

export class ClientEntity {
  @ApiProperty()
  accessToken: string;

  // @ApiProperty()
  // refreshToken: string;
}
