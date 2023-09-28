import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ClientCredentialsService {
  private clientCredentials: { clientID: string; clientSecret: string } | null =
    null;
  // constructor() {
  //   dotenv.config();
  // }
  generateClientCredentials(): { clientID: string; clientSecret: string } {
    const clientID = uuidv4();
    const clientSecret = uuidv4(clientID);
    this.clientCredentials =  {clientID, clientSecret}
    return this.clientCredentials;
  }
  getClientCredentials(): {clientID: string; clientSecret:string} {
    console.log(this.clientCredentials);
    return this.clientCredentials;
  }
}
  // private saveUpdatedEnvVariables(): void{
  //   const updatedEnvString = `CLIENT_ID=${process.env.CLIENT_ID}\nCLIENT_SECRET=${process.env.CLIENT_SECRET}\n`;
  //   const fs = require('fs').promises;
  //   fs.writeFile('.env', updatedEnvString)
  //     .then(() => {
  //       console.log('Environment variables updated successfully.');
  //     })
  //     .catch((error) => {
  //       console.error('Error updating environment variables:', error);
  //     });
  // }

