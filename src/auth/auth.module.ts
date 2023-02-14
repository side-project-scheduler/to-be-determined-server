import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './../user/user.repository';
import { Module } from '@nestjs/common';
import {
  SignupController,
  LoginController,
  AuthLogoutController,
  AuthVerifyController,
} from './controllers';
import { SignupService, LoginService } from './services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CheckEmailDuplicateRepository } from './outbound-adapter/check-email-duplicate.repository';
import { GetUserByEmailRepository } from './outbound-adapter/get-user-by-email.repository';
import { CreateUserRepository } from './outbound-adapter/create-user.repository';
import { Profile } from '../profile/entities/profile.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [
    SignupController,
    LoginController,
    AuthLogoutController,
    AuthVerifyController,
  ],
  providers: [
    SignupService,
    LoginService,
    UserRepository,
    GetUserByEmailRepository,
    CheckEmailDuplicateRepository,
    CreateUserRepository,
    JwtStrategy,
    JwtService,
  ],
  exports: [],
})
export class AuthModule {}
