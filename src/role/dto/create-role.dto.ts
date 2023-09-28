import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    roleName: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty()
    description?: string;
}
