import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserType {
  @Field()
  uuid: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  loginAttempts: number;

  @Field()
  locked: boolean;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;
}
