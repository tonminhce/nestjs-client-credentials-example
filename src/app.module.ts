import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
// import { OAuth2Module } from './oauth2/oauth2.module';
import { GoogleStrategy } from './google.strategy';
import { ClientModule } from './credentials/gen-credentials.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path'; 
import * as Joi from '@hapi/joi';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
@Module({
  imports: [
    PrismaModule,
    JwtModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    UserRoleModule,
    PermissionModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
      })
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // transport: config.get('MAIL_TRANSPORT'),
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'src/templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    // ClientModule
    // OAuth2Module,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, GoogleStrategy],
})
export class AppModule {}