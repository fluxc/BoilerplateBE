import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { v4 as uuid } from 'uuid';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { JwtPayload } from 'src/auth/interfaces/jwtPayload.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserInput: CreateUserInput) {
    const { password } = createUserInput;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const inputUser = {
      ...createUserInput,
      tokenPublicKey: uuid(),
      uuid: uuid(),
      password: hashedPassword,
    };
    const newUser = new this.userModel(inputUser);

    try {
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        // duplicate user returns 409
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async handleInvalidPassword(user) {
    user.loginAttempts = user.loginAttempts + 1;

    if (user.loginAttempts > 5) {
      user.locked = true;
    }

    return await user.save();
  }

  async handleSuccessfulLogin(user) {
    user.lastLogin = new Date(dayjs().toISOString());
    user.loginAttempts = 0;

    await user.save();
  }

  findUserValidation(payload: JwtPayload) {
    const { sub, tokenPublicKey } = payload;
    return this.userModel.findOne({ uuid: sub, tokenPublicKey });
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getUsers() {
    return this.userModel.find();
  }

  async getUserById(uuid: string) {
    const findUser = await this.userModel.findOne({ uuid: uuid });
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  async updateUser(uuid: string, updateUserInput: UpdateUserInput) {
    const findUser = await this.userModel.findOneAndUpdate(
      { uuid: uuid },
      updateUserInput,
    );
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }
  async deleteUser(uuid: string) {
    const findUser = await this.userModel.findOneAndDelete({ uuid: uuid });
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }
}
