import { Controller, Get } from '@nestjs/common';
import { ClientCredentialsService } from './gen-credentials.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientCredentialsService: ClientCredentialsService,
  ) {}

  @Get('credentials')
  generateCredentials(): { clientID: string; clientSecret: string } {
    const credentials = this.clientCredentialsService.generateClientCredentials();
    return credentials;
  }
  @Get('get')
  getClientCredentials(): {clientID: string; clientSecret:string} {
    console.log(this.clientCredentialsService.getClientCredentials());
    return this.clientCredentialsService.getClientCredentials();
  }

}
