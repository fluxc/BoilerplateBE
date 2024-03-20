import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthCredentialsInput } from './dto/auth.input';
import { AuthService } from './auth.service';
import { UserType } from 'src/user/type/user.type';
import { CreateUserInput } from 'src/user/dto/user.input';
import { UsersService } from 'src/user/user.service';
import { LoginResponseType } from './type/login.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponseType)
  async login(
    @Args('authCredentialsInput') authCredentialsInput: AuthCredentialsInput,
  ) {
    const loginResponse = await this.authService.signIn(authCredentialsInput);
    return loginResponse;
  }

  @Mutation(() => UserType)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }
}
