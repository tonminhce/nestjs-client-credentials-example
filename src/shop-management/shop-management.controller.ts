// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ShopManagementService } from './shop-management.service';

import { ShopManagementEntity } from './entities/shop-management.entity';
import { CreateShopManagement } from './dto/create-shop-management.dto';
import { TokenEntity } from './entities/token.entity';
import { ResEntity } from './entities/response.entity';
import { ResDto } from './dto/create.dto';
import { FlagService } from './flag.service';
const axios = require('axios');

@Controller('ShopManagement')
@ApiTags('ShopManagement')
export class ShopManagementController {
  constructor(
    private readonly shopManagementService: ShopManagementService,
    private readonly flagService: FlagService,
  ) {}
  @Post('token')
  async submitToken(@Body() { accessToken }: TokenEntity) {
    try {
      const response = await axios.post('http://localhost:3000/auth/check', {
        accessToken: accessToken,
      });

      // The request was successful
      // You can access the response data here
      const responseData = response.data;

      // You can retunr a success message or data
      return {
        success: true,
        message: 'Token verification successful',
        data: responseData,
      };
    } catch (error) {
      // Handle errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(
          'Server responded with status code:',
          error.response.status,
        );
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something else went wrong
        console.error('Error:', error.message);
      }

      // Return an error response
      return {
        success: false,
        error: 'An error occurred while verifying the token',
      };
    }
  }
  @Post('role')
  @ApiCreatedResponse({ type: ResEntity })
  async role(@Body() { inputs }: ResDto) {
    if (inputs == 'true') {
      console.log('have role');
      this.flagService.setAllowCreateFlag(true); // Set the flag to true
      return 'You have role';
    } else {
      this.flagService.setAllowCreateFlag(false); // Set the flag to false
      return 'You do not have role';
    }
  }
  @Post('create')
  @ApiCreatedResponse({ type: ShopManagementEntity })
  async create(@Body() createShopManagement: CreateShopManagement) {
    const allowCreate = this.flagService.getAllowCreateFlag();

    if (allowCreate) {
      console.log('You are allowed to create');
      return "You are allowed to create ";
    } else {
      return 'You are not allowed to create';
    }
  }
  @Post('logout')
  async reset() {
    this.flagService.setAllowCreateFlag(false);
    return this.flagService.getAllowCreateFlag();
  }
}
