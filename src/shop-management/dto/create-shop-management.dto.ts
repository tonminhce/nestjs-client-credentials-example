import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateShopManagement {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}