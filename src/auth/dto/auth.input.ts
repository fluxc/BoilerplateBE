import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AuthCredentialsInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}
