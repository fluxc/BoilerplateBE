import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { UpdateUserInput } from './dto/user.input';
import { UserType } from './type/user.type';
import { GqlAuthGuard } from 'src/auth/guard/graphql.guard';
import { UseGuards } from '@nestjs/common';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/schemas/user.schema';

@Resolver(() => UserType)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType])
  getUsers() {
    return this.usersService.getUsers();
  }

  @Query(() => UserType)
  getUser(@GetUser() user: User) {
    return this.usersService.getUserById(user.uuid);
  }

  @Mutation(() => UserType)
  updateUser(
    @Args('uuid') uuid: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.updateUser(uuid, updateUserInput);
  }

  @Mutation(() => UserType)
  deleteUser(@GetUser() user: User) {
    return this.usersService.deleteUser(user.uuid);
  }
}
