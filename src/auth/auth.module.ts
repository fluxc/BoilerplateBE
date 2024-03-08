import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
