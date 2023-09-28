//src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @ApiProperty()
  clientID: string;

  @IsNotEmpty()
  @ApiProperty()
  clientSecret: string;

  @IsNotEmpty()
  @ApiProperty()
  grantType: string;
}
