//src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TokenDto {
  @IsNotEmpty()
  @ApiProperty()
  inputs: string;
}
