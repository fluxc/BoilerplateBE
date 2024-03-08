import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsInput } from './dto/auth.input';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/schemas/user.schema';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { TokenType } from './type/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn(authCredentialsInput: AuthCredentialsInput): Promise<TokenType> {
    const { email, password } = authCredentialsInput;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    if (user.locked) {
      throw new UnauthorizedException('Account locked');
    }

    // Check password
    if (!this.validatePassword(password, user.password)) {
      await this.userService.handleInvalidPassword(user);
      throw new UnauthorizedException('Please check your login credentials');
    }
    await this.userService.handleSuccessfulLogin(user);

    const accessToken = await this.createToken(user);
    return { token: accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.userService.findUserValidation(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  validatePassword(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  createToken(user: User) {
    return this.jwtService.sign({
      iss: 'Park Point',
      tokenPublicKey: user.tokenPublicKey,
      sub: user.uuid,
    });
  }
}
