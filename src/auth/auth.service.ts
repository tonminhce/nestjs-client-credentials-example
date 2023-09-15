//src/auth/auth.service.ts
import { AuthEntity } from './entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.authRepository.findByEmail(email);
    await this.authRepository.validatePassword(user, password);

    const accessToken = await this.authRepository.createToken(user.id);
    const refreshToken = await this.authRepository.createRefreshToken(user.id);
    return { accessToken, refreshToken };
  }
}