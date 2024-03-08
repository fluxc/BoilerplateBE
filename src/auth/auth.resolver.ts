import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthCredentialsInput } from './dto/auth.input';
import { AuthService } from './auth.service';
import { TokenType } from './type/auth.type';
import { UserType } from 'src/user/type/user.type';
import { CreateUserInput } from 'src/user/dto/user.input';
import { UsersService } from 'src/user/user.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => TokenType)
  async login(
    @Args('authCredentialsInput') authCredentialsInput: AuthCredentialsInput,
  ) {
    const token = await this.authService.signIn(authCredentialsInput);
    return token;
  }

  @Mutation(() => UserType)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }
}
