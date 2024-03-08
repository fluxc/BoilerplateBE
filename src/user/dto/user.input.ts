import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @Field()
  password: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  avatarUrl?: string;
}

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  avatarUrl?: string;
}
