import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteAccountInput {
  @Field()
  nickname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
