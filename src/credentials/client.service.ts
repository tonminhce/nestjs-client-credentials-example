import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AnotherService {
  constructor(private readonly authService: AuthService) {}

  createNewClient(): void {
    // Generate a new client ID and client secret
    // const clientId = this.authService.generateClientId();
    // const clientSecret = this.authService.generateClientSecret();

    // You can now use clientId and clientSecret in this service as needed.
  }
}
