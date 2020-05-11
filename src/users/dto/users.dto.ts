import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UsersDto {
  @Field(() => ID)
  readonly id: number;

  @Field()
  readonly nickname: string;

  @Field()
  readonly email: string;

  readonly password: string;
}
