//src/auth/auth.service.ts
import { AuthEntity } from './entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { ClientCredentialsService } from 'src/credentials/gen-credentials.service';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

// export  ClientCredentialsService  from 'src/credentials/gen-credentials.service';
@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}
  private clientCredentials: { clientID: string; clientSecret: string } | null =
    null;
  async getRoleName(accessToken: string) {
    try {
      // Verify and decode the JWT access token to extract the userId
      const decodedToken = jwt.verify(accessToken, 'zjP9h6ZI5LoSKCRj'); // Replace 'your-secret-key' with your actual secret key

      // Assuming the userId is stored in the decoded token
      const userId = decodedToken.userId;

      // Now you can use the userId to fetch the role name
      return this.authRepository.getRoleName(userId);
    } catch (error) {
      // Handle token verification or decoding errors here
      console.error('Error decoding token:', error);
      throw new Error('Invalid access token');
    }
  }

  async validate(
    clientID: string,
    clientSecret: string,
    grantType: string,
  ): Promise<AuthEntity> {
    const email = process.env.email;
    const password = process.env.password;
    if (grantType != 'client_credentials') {
      throw {
        statusCode: 401,
        message: 'Invalid grant type',
      };
    }
    // console.log(process.env.CLIENT_ID);
    const user = await this.authRepository.findOne(email);
    const accessToken = await this.authRepository.createToken(user.id);
    // const refreshToken = await this.authRepository.createRefreshToken(
    //   user.id,
    // );
    console.log(accessToken)
    return { accessToken };
  }

  async getPermission(userId: number) {
    return this.authRepository.getRoleAndPermissionByUserId(1);
  }
  generateClientCredentials(): { clientID: string; clientSecret: string } {
    const clientSecret = uuidv4();
    const clientID = uuidv4(clientSecret);
    this.clientCredentials = { clientID, clientSecret };
    return this.clientCredentials;
  }
  getClientCredentials(): { clientID: string; clientSecret: string } {
    // console.log(this.clientCredentials.clientId);
    return this.clientCredentials;
  }
}
