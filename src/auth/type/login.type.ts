import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from 'src/user/type/user.type';

@ObjectType('LoginResponseType')
export class LoginResponseType {
  @Field()
  token: string;
  @Field(() => UserType)
  user: UserType;
}
