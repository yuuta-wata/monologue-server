import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  nickname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
