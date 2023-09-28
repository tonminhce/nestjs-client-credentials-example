//src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { JwtStrategy } from './jwt.strategy';
// import { AuthRepository } from './auth.repository';
import { UserTestModule } from 'src/user-test/user-test.module';
import { UserTestService } from 'src/user-test/user-test.service';
import { UserTestRepository } from 'src/user-test/user-test.repository';
import { ClientController } from './gen-credentials.controller';
import { ClientCredentialsService } from './gen-credentials.service';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '100m' }, // e.g. 7d, 24h
    }),
    UserTestModule,
  ],
  controllers: [ClientController ],
  providers: [
    ClientCredentialsService,
    UserTestService,
    UserTestRepository,
  ],
})
export class ClientModule {}
