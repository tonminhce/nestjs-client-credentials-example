import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from './entities/role.entity';

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Post()
  @ApiCreatedResponse({ type: RoleEntity })
  async create(@Body() createRoleDto: CreateRoleDto) {
    return new RoleEntity(await this.roleService.create(createRoleDto));
  }

  // @Get()
  //@UseGuards(JwtAuthGuard)
  //@ApiBearerAuth()
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async findAll() {
    const role = await this.roleService.findAll();
    return role.map((role) => new RoleEntity(role));
  }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: RoleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new RoleEntity(await this.roleService.findOne(id));
  }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({ type: RoleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return new RoleEntity(await this.roleService.update(id, updateRoleDto));
  }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: RoleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new RoleEntity(await this.roleService.remove(id));
  }
}