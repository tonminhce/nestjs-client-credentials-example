//src/auth/auth.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { ClientEntity } from './entities/dient-credentials.entity';
import { ClientDto } from './dto/client-credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Permissions } from 'src/permission/decorator/permission.decorator';
import { Role } from 'src/role/enums/role.enum';
import { Permission } from 'src/permission/enums/permission.enum';
import { AuthGuards } from 'src/auth/auth.guard';
import { Roles } from 'src/role/decorator/role.decorator';
import axios from 'axios';
import { get } from 'http';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('credentials')
  generateCredentials(): { clientID: string; clientSecret: string } {
    const credentials = this.authService.generateClientCredentials();
    return credentials;
  }
  @Post('grant')
  async validate(@Body() { clientID, clientSecret, grantType }: ClientDto) {
    // Retrieve client credentials from the shared service
    const storedCredentials = this.authService.getClientCredentials();
    // Check if the provided client credentials match the stored credentials
      const providedClientID = clientID;
      console.log(clientID)
      const storedClientID = storedCredentials.clientID;
      console.log(storedClientID)
      const providedClientSecret = clientSecret;
      const storedClientSecret = storedCredentials.clientSecret;

      // Check if the provided client credentials match the stored credentials
      if (providedClientID == storedClientID && clientSecret == storedClientSecret) {
      // You can pass grantType to your authService.validate method if needed
      const accessToken = await this.authService.validate(providedClientID,
        providedClientSecret,
        grantType);
      return accessToken;
    }
     else {
      // Handle invalid credentials here
      throw {
        statusCode: 401,
        message: 'Invalid credentials',
      };
    }
  }

  @Post('check')
  async validateAccessToken(@Body() { accessToken }: AuthEntity) {
    const roleNames = await this.authService.getRoleName(accessToken);

    if (roleNames[0] == 'admin') {
      console.log('assmin');
      try {
        const response = await axios.post(
          'http://localhost:3001/ShopManagement/role',
          {
            inputs: 'true',
          },
        );

        // The request was successful
        // You can access the response data here
        const responseData = response.data;

        // You can return a success message or data
        return {
          success: true,
          message: 'Send to resource server successfully',
          data: responseData,
        };
      } catch (error) {
        // Handle errors here
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error(
            'Resource server responded with status code:',
            error.response.status,
          );
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the resource server');
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
    } else {
      await axios.post('http://localhost:3001/ShopManagement/role', {
        inputs: 'false',
      });
      return false;
    }
    // return false;
  }
}
